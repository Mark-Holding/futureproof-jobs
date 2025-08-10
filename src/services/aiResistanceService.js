// services/aiResistanceService.js
// Service layer for the AI Resistance Algorithm in React

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug logging
console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Not set');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Resistance factor weights (from your algorithm)
const RESISTANCE_WEIGHTS = {
  physical_coordination: { weight: 0.25, type: 'protection' },
  creative_artistic: { weight: 0.20, type: 'protection' },
  human_interaction: { weight: 0.18, type: 'protection' },
  complex_reasoning: { weight: 0.15, type: 'protection' },
  mathematical_technical: { weight: -0.20, type: 'vulnerability' },
  routine_cognitive: { weight: -0.15, type: 'vulnerability' },
  data_processing: { weight: -0.12, type: 'vulnerability' },
  equipment_operation: { weight: -0.08, type: 'vulnerability' }
};

// Service object with methods
const aiResistanceService = {
  
  /**
   * Test database connection and return status
   */
  async testConnection() {
    try {
      console.log('Testing Supabase connection...');
      
      // Test basic connection by querying occupations table
      const { data: occupations, error } = await supabase
        .from('occupations')
        .select('soc_code')
        .limit(1);

      if (error) {
        console.error('Database connection test failed:', error);
        return {
          connected: false,
          error: error.message,
          occupationCount: 0,
          details: 'Failed to query occupations table'
        };
      }

      // Get total occupation count
      const { count, error: countError } = await supabase
        .from('occupations')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.error('Count query failed:', countError);
        return {
          connected: true,
          occupationCount: 0,
          error: countError.message,
          details: 'Connected but count query failed'
        };
      }

      // Test if other required tables exist
      const requiredTables = ['alternate_titles', 'skills_data', 'knowledge_data', 'abilities_data'];
      const tableStatus = {};
      
      for (const table of requiredTables) {
        try {
          const { error: tableError } = await supabase
            .from(table)
            .select('*')
            .limit(1);
          
          tableStatus[table] = !tableError;
        } catch (e) {
          tableStatus[table] = false;
        }
      }

      console.log('Connection test successful:', { count, tableStatus });

      return {
        connected: true,
        occupationCount: count || 0,
        error: null,
        tableStatus
      };

    } catch (error) {
      console.error('Database connection test error:', error);
      return {
        connected: false,
        error: error.message,
        occupationCount: 0,
        details: 'Connection test threw exception'
      };
    }
  },

/**
 * Search for job titles with better matching logic
   */
  async searchJobTitles(query) {
    try {
      const normalizedQuery = query.toLowerCase().trim();
      
      // 1. Exact match first
      let { data: exactMatches } = await supabase
        .from('alternate_titles')
        .select(`
          soc_code,
          alternate_title,
          occupations (title, description)
        `)
        .ilike('alternate_title', normalizedQuery);

      if (exactMatches?.length > 0) {
        return exactMatches.map(match => ({
          soc_code: match.soc_code,
          title: match.occupations.title,
          matched_term: match.alternate_title,
          match_type: 'exact'
        }));
      }

      // 2. Word-boundary matching (better than substring)
      const { data: wordMatches } = await supabase
        .from('alternate_titles')
        .select(`
          soc_code,
          alternate_title,
          occupations (title, description)
        `)
        .or(`alternate_title.ilike.${normalizedQuery}%,alternate_title.ilike.% ${normalizedQuery}%`)
        .limit(5);
  
      if (wordMatches?.length > 0) {
        return wordMatches.map(match => ({
          soc_code: match.soc_code,
          title: match.occupations.title,
          matched_term: match.alternate_title,
          match_type: 'word_boundary'
        }));
      }
  
      // 3. Only then try broad fuzzy matching
      const { data: fuzzyMatches } = await supabase
        .from('alternate_titles')
        .select(`
          soc_code,
          alternate_title,
          occupations (title, description)
        `)
        .ilike('alternate_title', `%${normalizedQuery}%`)
        .limit(10);

      return fuzzyMatches?.map(match => ({
        soc_code: match.soc_code,
        title: match.occupations.title,
        matched_term: match.alternate_title,
        match_type: 'fuzzy'
      })) || [];

    } catch (error) {
      console.error('Error searching job titles:', error);
      throw error;
    }
  },

  /**
   * Get occupation data by SOC code
   */
  async getOccupationData(socCode) {
    try {
      const { data: occupation } = await supabase
        .from('occupations')
        .select('*')
        .eq('soc_code', socCode)
        .single();

      if (!occupation) {
        throw new Error(`Occupation not found: ${socCode}`);
      }

      return occupation;
    } catch (error) {
      console.error('Error getting occupation data:', error);
      throw error;
    }
  },

  /**
   * Get all O*NET data (skills, knowledge, abilities) for a SOC code
   */
  async getONETData(socCode) {
    try {
      // Get skills data
      const { data: skillsData } = await supabase
        .from('skills_data')
        .select('*')
        .eq('soc_code', socCode);

      // Get knowledge data
      const { data: knowledgeData } = await supabase
        .from('knowledge_data')
        .select('*')
        .eq('soc_code', socCode);

      // Get abilities data
      const { data: abilitiesData } = await supabase
        .from('abilities_data')
        .select('*')
        .eq('soc_code', socCode);

      return {
        skills: this.processElementData(skillsData || []),
        knowledge: this.processElementData(knowledgeData || []),
        abilities: this.processElementData(abilitiesData || [])
      };

    } catch (error) {
      console.error('Error getting O*NET data:', error);
      throw error;
    }
  },

  /**
   * Process raw element data into structured format
   */
  processElementData(rawData) {
    const processed = {};
    
    rawData.forEach(item => {
      if (!processed[item.element_name]) {
        processed[item.element_name] = {};
      }
      processed[item.element_name][item.scale_type] = item.data_value;
    });

    return processed;
  },

  /**
   * Get resistance factor mappings from database
   */
  async getResistanceFactorMappings() {
    try {
      const { data: mappings } = await supabase
        .from('element_factor_mappings')
        .select(`
          factor_name,
          element_name,
          element_type,
          resistance_factors (
            weight,
            factor_type
          )
        `);

      // Group by factor
      const groupedMappings = {};
      mappings?.forEach(mapping => {
        if (!groupedMappings[mapping.factor_name]) {
          groupedMappings[mapping.factor_name] = {
            weight: mapping.resistance_factors.weight,
            type: mapping.resistance_factors.factor_type,
            elements: {
              skills: [],
              knowledge: [],
              abilities: []
            }
          };
        }
        
        const elementType = mapping.element_type === 'ability' ? 'abilities' : 
                           mapping.element_type === 'skill' ? 'skills' : 'knowledge';
        groupedMappings[mapping.factor_name].elements[elementType].push(mapping.element_name);
      });

      return groupedMappings;
    } catch (error) {
      console.error('Error getting resistance factor mappings:', error);
      // Fallback to hardcoded mappings if database fails
      return this.getHardcodedMappings();
    }
  },

  /**
   * Hardcoded mappings as fallback
   */
  getHardcodedMappings() {
    return {
      physical_coordination: {
        weight: 0.25,
        type: 'protection',
        elements: {
          abilities: ['Gross Body Coordination', 'Dynamic Flexibility', 'Stamina', 'Manual Dexterity', 'Multilimb Coordination', 'Extent Flexibility'],
          skills: ['Coordination'],
          knowledge: []
        }
      },
      creative_artistic: {
        weight: 0.20,
        type: 'protection',
        elements: {
          abilities: ['Originality', 'Fluency of Ideas'],
          skills: [],
          knowledge: ['Fine Arts', 'History and Archeology', 'Philosophy and Theology']
        }
      },
      human_interaction: {
        weight: 0.18,
        type: 'protection',
        elements: {
          abilities: ['Oral Expression', 'Speech Clarity', 'Oral Comprehension'],
          skills: ['Social Perceptiveness', 'Persuasion', 'Negotiation', 'Service Orientation', 'Active Listening', 'Speaking'],
          knowledge: ['Psychology', 'Therapy and Counseling', 'Customer and Personal Service']
        }
      },
      complex_reasoning: {
        weight: 0.15,
        type: 'protection',
        elements: {
          abilities: ['Problem Sensitivity', 'Deductive Reasoning', 'Inductive Reasoning', 'Category Flexibility'],
          skills: ['Critical Thinking', 'Complex Problem Solving', 'Judgment and Decision Making', 'Systems Analysis'],
          knowledge: ['Administration and Management', 'Personnel and Human Resources']
        }
      },
      mathematical_technical: {
        weight: -0.20,
        type: 'vulnerability',
        elements: {
          abilities: ['Mathematical Reasoning', 'Number Facility'],
          skills: ['Mathematics', 'Science', 'Programming', 'Operations Analysis', 'Technology Design'],
          knowledge: ['Mathematics', 'Physics', 'Chemistry', 'Computers and Electronics', 'Engineering and Technology']
        }
      },
      routine_cognitive: {
        weight: -0.15,
        type: 'vulnerability',
        elements: {
          abilities: ['Memorization', 'Perceptual Speed', 'Information Ordering'],
          skills: ['Monitoring', 'Quality Control Analysis', 'Operations Monitoring'],
          knowledge: ['Administrative']
        }
      },
      data_processing: {
        weight: -0.12,
        type: 'vulnerability',
        elements: {
          abilities: ['Written Comprehension', 'Written Expression'],
          skills: ['Reading Comprehension', 'Writing'],
          knowledge: ['Economics and Accounting']
        }
      },
      equipment_operation: {
        weight: -0.08,
        type: 'vulnerability',
        elements: {
          abilities: ['Control Precision', 'Rate Control', 'Reaction Time'],
          skills: ['Equipment Selection', 'Installation', 'Equipment Maintenance', 'Operation and Control'],
          knowledge: ['Mechanical', 'Production and Processing']
        }
      }
    };
  },

  /**
   * Calculate AI resistance score for a given SOC code
   */
  /**
   * Calculate AI resistance score for a given SOC code
   */
  async calculateResistanceScore(socCode) {
    try {
      console.log('🔍 Calculating resistance for SOC:', socCode);
      
      // Check cache first
      const { data: cached } = await supabase
        .from('job_analysis_cache')
        .select('*')
        .eq('soc_code', socCode)
        .eq('algorithm_version', 'v2.0')
        .single();

      if (cached && cached.created_at > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
        // Use cache if less than 7 days old
        return {
          score: cached.resistance_score,
          factorScores: cached.factor_scores,
          breakdown: cached.breakdown,
          fromCache: true
        };
      }

      // Calculate fresh score
      const onetData = await this.getONETData(socCode);
      console.log('📊 O*NET data loaded:', {
        skills: Object.keys(onetData.skills).length,
        knowledge: Object.keys(onetData.knowledge).length, 
        abilities: Object.keys(onetData.abilities).length
      });
      
      const mappings = await this.getResistanceFactorMappings();
      console.log('🗺️ Factor mappings loaded:', Object.keys(mappings));
      
      let factorScores = {};
      let totalWeightedScore = 0;

      // Calculate each resistance factor
      Object.entries(mappings).forEach(([factorName, factorConfig]) => {
        let factorScore = 0;
        let elementCount = 0;

        // Process abilities
        factorConfig.elements.abilities.forEach(abilityName => {
          if (onetData.abilities[abilityName]) {
            const importance = onetData.abilities[abilityName].Importance || 0;
            const level = onetData.abilities[abilityName].Level || 0;
            const score = (importance * level) / 35; // Max is 5*7
            factorScore += score;
            elementCount++;
          }
        });

        // Process skills
        factorConfig.elements.skills.forEach(skillName => {
          if (onetData.skills[skillName]) {
            const importance = onetData.skills[skillName].Importance || 0;
            const level = onetData.skills[skillName].Level || 0;
            const score = (importance * level) / 35;
            factorScore += score;
            elementCount++;
          }
        });

        // Process knowledge
        factorConfig.elements.knowledge.forEach(knowledgeName => {
          if (onetData.knowledge[knowledgeName]) {
            const importance = onetData.knowledge[knowledgeName].Importance || 0;
            const level = onetData.knowledge[knowledgeName].Level || 0;
            const score = (importance * level) / 35;
            factorScore += score;
            elementCount++;
          }
        });

        if (elementCount > 0) {
          factorScores[factorName] = factorScore / elementCount; // Average score
          const contribution = factorScores[factorName] * factorConfig.weight;
          totalWeightedScore += contribution;
          console.log(`✅ ${factorName}: ${factorScores[factorName].toFixed(3)} × ${factorConfig.weight} = ${contribution.toFixed(3)}`);
        } else {
          console.log(`❌ ${factorName}: No matching elements found`);
        }
      });
  
      console.log('🎯 Final calculation:');
      console.log('Total weighted score:', totalWeightedScore.toFixed(3));

      // Convert to 0-100 scale with 50 as neutral
      const finalScore = Math.max(0, Math.min(100, 50 + (totalWeightedScore * 100)));
      console.log('Final score:', finalScore);

      const result = {
        score: Math.round(finalScore),
        factorScores,
        breakdown: Object.entries(factorScores).map(([factor, score]) => ({
          factor,
          score: Math.round(score * 100),
          weight: mappings[factor].weight,
          type: mappings[factor].type,
          contribution: Math.round(score * mappings[factor].weight * 100)
        })),
        fromCache: false
      };

      // Cache the result
      await this.cacheResult(socCode, result);

      return result;

    } catch (error) {
      console.error('Error calculating resistance score:', error);
      throw error;
    }
  },

  /**
   * Cache calculation result
   */
  async cacheResult(socCode, result) {
    try {
      await supabase
        .from('job_analysis_cache')
        .upsert({
          soc_code: socCode,
          resistance_score: result.score,
          factor_scores: result.factorScores,
          breakdown: result.breakdown,
          algorithm_version: 'v2.0'
        });
    } catch (error) {
      console.error('Error caching result:', error);
      // Don't throw - caching failure shouldn't break the main function
    }
  },

  /**
   * Log user query for analytics
   */
  async logUserQuery(queryText, matchedSocCode, resistanceScore) {
    try {
      await supabase
        .from('user_queries')
        .insert({
          query_text: queryText,
          matched_soc_code: matchedSocCode,
          resistance_score: resistanceScore
        });
    } catch (error) {
      console.error('Error logging user query:', error);
      // Don't throw - logging failure shouldn't break the main function
    }
  },

  /**
   * Main analysis function - combines search and scoring
   */
  async analyzeJob(jobTitle) {
    try {
      // Search for matching occupations
      const matches = await this.searchJobTitles(jobTitle);
      
      if (matches.length === 0) {
        return {
          success: false,
          error: 'No matching occupation found',
          suggestions: await this.getSuggestions(jobTitle)
        };
      }

      // Use the best match (first result)
      const bestMatch = matches[0];
      
      // Get occupation details
      const occupation = await this.getOccupationData(bestMatch.soc_code);
      
      // Calculate resistance score
      const analysis = await this.calculateResistanceScore(bestMatch.soc_code);
      
      // Log the query
      await this.logUserQuery(jobTitle, bestMatch.soc_code, analysis.score);

      return {
        success: true,
        occupation: {
          soc_code: bestMatch.soc_code,
          title: occupation.title,
          description: occupation.description,
          matched_term: bestMatch.matched_term,
          match_type: bestMatch.match_type
        },
        analysis: {
          resistance_score: analysis.score,
          factor_scores: analysis.factorScores,
          breakdown: analysis.breakdown,
          from_cache: analysis.fromCache
        },
        alternatives: matches.slice(1, 5) // Additional matches
      };

    } catch (error) {
      console.error('Error analyzing job:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Get job title suggestions for failed searches
   */
  async getSuggestions(failedQuery) {
    try {
      // Get some popular job titles as suggestions
      const { data: suggestions } = await supabase
        .from('alternate_titles')
        .select(`
          alternate_title,
          occupations (title)
        `)
        .limit(10);

      return suggestions?.map(s => s.alternate_title) || [];
    } catch (error) {
      console.error('Error getting suggestions:', error);
      return ['dancer', 'software engineer', 'nurse', 'teacher', 'manager'];
    }
  },

  /**
   * Get analytics data
   */
  async getAnalytics(days = 30) {
    try {
      // Fix the date formatting - use a simpler approach
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      const cutoffString = cutoffDate.toISOString();
  
      const { data: queries, error } = await supabase
        .from('user_queries')
        .select('*')
        .gte('created_at', cutoffString);
  
      if (error) {
        console.error('Analytics query error:', error);
        return null;
      }

      return {
        total_queries: queries?.length || 0,
        unique_jobs: new Set(queries?.map(q => q.matched_soc_code)).size,
        average_score: queries?.reduce((sum, q) => sum + (q.resistance_score || 0), 0) / (queries?.length || 1),
        popular_queries: this.getPopularQueries(queries || [])
      };
    } catch (error) {
      console.error('Error getting analytics:', error);
      return null;
    }
  },

  /**
   * Helper to get popular queries
   */
  getPopularQueries(queries) {
    const counts = {};
    queries.forEach(q => {
      counts[q.query_text] = (counts[q.query_text] || 0) + 1;
    });
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));
  }
};

// Export the service object
export default aiResistanceService;