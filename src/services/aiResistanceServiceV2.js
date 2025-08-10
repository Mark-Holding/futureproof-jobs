/**
 * AI Resistance Algorithm v2.0 - Implementation
 * Context-aware factor scoring with 10 resistance factors
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

class AIResistanceServiceV2 {
  constructor() {
    this.version = 'v2.0';
    this.algorithmVersion = 'v2.0';
  }

  /**
   * Calculate AI resistance score for a given SOC code
   */
  async calculateResistanceScore(socCode) {
    try {
      console.log('🔍 ===== AI RESISTANCE ANALYSIS START =====');
      console.log('🔍 Calculating resistance for SOC:', socCode);
      
      // Check cache first
      const { data: cached } = await supabase
        .from('job_analysis_cache')
        .select('*')
        .eq('soc_code', socCode)
        .eq('algorithm_version', this.algorithmVersion)
        .single();

      if (cached && cached.created_at > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
        console.log('📋 Using cached result');
        return {
          score: cached.resistance_score,
          factorScores: cached.factor_scores,
          breakdown: cached.breakdown,
          fromCache: true
        };
      }

      // Calculate fresh score
      const onetData = await this.getONETData(socCode);
      
      // 1. O*NET Data Inspection - Log all elements with scores > 0.5
      console.log('📊 ===== O*NET DATA INSPECTION =====');
      this.logHighScoringElements(onetData);
      
      const factorMappings = await this.getResistanceFactorMappings();
      console.log('🗺️ Factor mappings loaded:', Object.keys(factorMappings));
      
      // Get job context for context-aware assignments
      const jobContext = this.analyzeJobContext(onetData);
      console.log('🎯 ===== JOB CONTEXT ANALYSIS =====');
      console.log('Job context details:', JSON.stringify(jobContext, null, 2));
      
      let factorScores = {};
      let totalWeightedScore = 0;
      let breakdown = {};

      // Calculate each resistance factor
      console.log('🔍 ===== FACTOR CALCULATION BREAKDOWN =====');
      Object.entries(factorMappings).forEach(([factorName, factorConfig]) => {
        console.log(`\n📊 ===== CALCULATING FACTOR: ${factorName} =====`);
        const { score, details } = this.calculateFactorScore(
          factorConfig, 
          onetData, 
          jobContext,
          factorName
        );
        
        factorScores[factorName] = score;
        breakdown[factorName] = details;
        
        const weightedContribution = score * factorConfig.weight;
        totalWeightedScore += weightedContribution;
        
        console.log(`✅ ${factorName}: ${score.toFixed(3)} × ${factorConfig.weight} = ${weightedContribution.toFixed(3)}`);
        
        // 5. Vulnerability Analysis - Special focus on vulnerability factors
        if (factorConfig.type === 'vulnerability' && score > 0.1) {
          console.log(`⚠️  VULNERABILITY FACTOR HIGH SCORE: ${factorName} = ${score.toFixed(3)}`);
          console.log('   This should be investigated - vulnerability factors should be low for physical jobs');
        }
      });

      console.log('\n🎯 ===== FINAL CALCULATION SUMMARY =====');
      console.log('Total weighted score:', totalWeightedScore);
      
      // Convert to 0-100 scale (50 = neutral)
      const finalScore = 50 + (totalWeightedScore * 50);
      console.log('Final score:', finalScore);
      console.log('🔍 ===== AI RESISTANCE ANALYSIS END =====\n');

      // Cache the result
      await this.cacheResult(socCode, finalScore, factorScores, breakdown);

      return {
        score: Math.max(0, Math.min(100, finalScore)),
        factorScores,
        breakdown,
        fromCache: false
      };

    } catch (error) {
      console.error('Error calculating resistance score:', error);
      throw error;
    }
  }

/**
 * Robust Context Detection System for All 1000+ Jobs
 * Uses relative scoring and stricter categories to properly classify job contexts
 */

  /**
   * Analyze job context using relative scoring approach
   */
  analyzeJobContext(onetData) {
    // Calculate relative scores for each context type
    const contextScores = {
      mechanical: this.calculateMechanicalScore(onetData),
      digital: this.calculateDigitalScore(onetData),
      interpersonal: this.calculateInterpersonalScore(onetData),
      regulatory: this.calculateRegulatoryScore(onetData),
      creative: this.calculateCreativeScore(onetData),
      routine: this.calculateRoutineScore(onetData),
      physical: this.calculatePhysicalScore(onetData),
      analytical: this.calculateAnalyticalScore(onetData)
    };
  
    // Determine context based on relative scores and smart thresholds
    const context = {};
    const scores = Object.values(contextScores);
    const maxScore = Math.max(...scores);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    console.log('\n🎯 ===== CONTEXT SCORE BREAKDOWN =====');
    Object.entries(contextScores).forEach(([contextType, score]) => {
      const isAboveMin = score > 0.25;
      const isAboveAvg = score > avgScore * 1.5;
      const isDominant = score === maxScore && score > 0.3;
      const isContext = (isAboveMin && isAboveAvg) || isDominant;
      
      console.log(`   ${contextType}: ${score.toFixed(3)} (min:${isAboveMin}, avg:${isAboveAvg}, dominant:${isDominant}) = ${isContext}`);
      
      context[contextType] = isContext;
    });
    
    console.log(`\n🎯 Context decisions:`, context);
    console.log(`🎯 Max score: ${maxScore.toFixed(3)}, Avg score: ${avgScore.toFixed(3)}`);
  
    return context;
  }
  
  /**
   * Calculate mechanical context score (0-1)
   * High score = physical tools, equipment, mechanical systems
   */
  calculateMechanicalScore(onetData) {
    const indicators = [
      // Highly specific mechanical knowledge
      { type: 'knowledge', name: 'Mechanical', weight: 0.4 },
      { type: 'knowledge', name: 'Building and Construction', weight: 0.3 },
      
      // Mechanical skills (hands-on)
      { type: 'skill', name: 'Repairing', weight: 0.3 },
      { type: 'skill', name: 'Troubleshooting', weight: 0.3 },
      { type: 'skill', name: 'Equipment Maintenance', weight: 0.25 },
      { type: 'skill', name: 'Installation', weight: 0.2 },
      
      // Physical abilities for mechanical work
      { type: 'ability', name: 'Manual Dexterity', weight: 0.2 },
      { type: 'ability', name: 'Static Strength', weight: 0.15 }
    ];
  
    return this.calculateContextScore(onetData, indicators);
  }
  
  /**
   * Calculate digital context score (0-1)
   * High score = programming, software, digital systems
   */
  calculateDigitalScore(onetData) {
    const indicators = [
      // Highly specific digital knowledge (removed broad "Engineering and Technology")
      { type: 'knowledge', name: 'Computers and Electronics', weight: 0.5 },
      { type: 'knowledge', name: 'Telecommunications', weight: 0.3 },
      
      // Digital-specific skills
      { type: 'skill', name: 'Programming', weight: 0.6 },
      { type: 'skill', name: 'Technology Design', weight: 0.4 },
      
      // Digital abilities
      { type: 'ability', name: 'Mathematical Reasoning', weight: 0.2 }, // Only if combined with digital skills
    ];
  
    return this.calculateContextScore(onetData, indicators);
  }
  
  /**
   * Calculate routine context score (0-1) 
   * High score = repetitive, standardized, process-driven work
   */
  calculateRoutineScore(onetData) {
    const indicators = [
      // Routine-specific knowledge
      { type: 'knowledge', name: 'Administrative', weight: 0.4 },
      { type: 'knowledge', name: 'Clerical', weight: 0.4 },
      
      // Routine-specific abilities (removed broad "Information Ordering")
      { type: 'ability', name: 'Perceptual Speed', weight: 0.3 },
      { type: 'ability', name: 'Memorization', weight: 0.25 },
      
      // Routine-specific skills
      { type: 'skill', name: 'Operations Monitoring', weight: 0.2 },
      
      // Physical routine indicators
      { type: 'ability', name: 'Finger Dexterity', weight: 0.15 } // Only for repetitive tasks
    ];
  
    return this.calculateContextScore(onetData, indicators);
  }
  
  /**
   * Calculate analytical context score (0-1)
   * High score = computational analysis, statistical work, quantitative research
   */
  calculateAnalyticalScore(onetData) {
    const indicators = [
      // Specific analytical knowledge (removed basic "Mathematics")
      { type: 'knowledge', name: 'Economics and Accounting', weight: 0.4 },
      { type: 'knowledge', name: 'Mathematics', weight: 0.3 }, // Only if other analytical indicators present
      
      // Analytical skills
      { type: 'skill', name: 'Mathematics', weight: 0.4 }, // Skill vs knowledge distinction
      { type: 'skill', name: 'Science', weight: 0.3 },
      { type: 'skill', name: 'Operations Analysis', weight: 0.2 },
      
      // Analytical abilities
      { type: 'ability', name: 'Mathematical Reasoning', weight: 0.3 },
      { type: 'ability', name: 'Number Facility', weight: 0.25 }
    ];
  
    return this.calculateContextScore(onetData, indicators);
  }
  
  /**
   * Calculate interpersonal context score (0-1)
   * High score = human interaction, relationship building, emotional intelligence
   */
  calculateInterpersonalScore(onetData) {
    const indicators = [
      // Interpersonal knowledge
      { type: 'knowledge', name: 'Psychology', weight: 0.4 },
      { type: 'knowledge', name: 'Customer and Personal Service', weight: 0.3 },
      { type: 'knowledge', name: 'Sociology and Anthropology', weight: 0.2 },
      
      // Interpersonal skills
      { type: 'skill', name: 'Social Perceptiveness', weight: 0.4 },
      { type: 'skill', name: 'Service Orientation', weight: 0.3 },
      { type: 'skill', name: 'Negotiation', weight: 0.25 },
      { type: 'skill', name: 'Persuasion', weight: 0.25 },
      
      // Communication abilities
      { type: 'ability', name: 'Oral Expression', weight: 0.2 },
      { type: 'ability', name: 'Speech Clarity', weight: 0.15 }
    ];
  
    return this.calculateContextScore(onetData, indicators);
  }
  
  /**
   * Calculate regulatory context score (0-1)
   * High score = legal compliance, professional licensing, safety regulations
   */
  calculateRegulatoryScore(onetData) {
    const indicators = [
      // Regulatory knowledge
      { type: 'knowledge', name: 'Law and Government', weight: 0.5 },
      { type: 'knowledge', name: 'Public Safety and Security', weight: 0.4 },
      { type: 'knowledge', name: 'Medicine and Dentistry', weight: 0.3 }
    ];
  
    return this.calculateContextScore(onetData, indicators);
  }
  
  /**
   * Calculate creative context score (0-1)
   * High score = original ideas, artistic expression, innovative problem solving
   */
  calculateCreativeScore(onetData) {
    const indicators = [
      // Creative abilities
      { type: 'ability', name: 'Originality', weight: 0.5 },
      { type: 'ability', name: 'Fluency of Ideas', weight: 0.4 },
      
      // Creative knowledge
      { type: 'knowledge', name: 'Fine Arts', weight: 0.4 },
      { type: 'knowledge', name: 'Design', weight: 0.3 },
      { type: 'knowledge', name: 'Communications and Media', weight: 0.2 }
    ];
  
    return this.calculateContextScore(onetData, indicators);
  }
  
  /**
   * Calculate physical context score (0-1)
   * High score = gross motor skills, physical strength, body coordination
   */
  calculatePhysicalScore(onetData) {
    const indicators = [
      // Physical abilities
      { type: 'ability', name: 'Gross Body Coordination', weight: 0.4 },
      { type: 'ability', name: 'Static Strength', weight: 0.3 },
      { type: 'ability', name: 'Dynamic Flexibility', weight: 0.25 },
      { type: 'ability', name: 'Stamina', weight: 0.25 },
      { type: 'ability', name: 'Trunk Strength', weight: 0.2 }
    ];
  
    return this.calculateContextScore(onetData, indicators);
  }
  
  /**
   * Calculate weighted context score based on indicators
   */
  calculateContextScore(onetData, indicators) {
    let totalScore = 0;
    let totalWeight = 0;
    
    indicators.forEach(indicator => {
      const dataCategory = indicator.type === 'ability' ? onetData.abilities :
                          indicator.type === 'skill' ? onetData.skills : 
                          onetData.knowledge;
      
      const element = dataCategory[indicator.name];
      if (element) {
        const importance = element.Importance || 0;
        const level = element.Level || 0;
        const rawScore = (importance * level) / 35; // 0-1 scale
        
        totalScore += rawScore * indicator.weight;
        totalWeight += indicator.weight;
      }
    });
    
    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  /**
   * 1. O*NET Data Inspection - Log all elements with scores > 0.5
   */
  logHighScoringElements(onetData) {
    console.log('📊 High-scoring O*NET elements (>0.5):');
    
    // Check abilities
    console.log('\n🔧 ABILITIES:');
    Object.entries(onetData.abilities).forEach(([name, data]) => {
      const importance = data.Importance || 0;
      const level = data.Level || 0;
      const score = (importance * level) / 35;
      if (score > 0.5) {
        console.log(`   ${name}: I=${importance}, L=${level}, Score=${score.toFixed(3)}`);
      }
    });
    
    // Check skills
    console.log('\n💡 SKILLS:');
    Object.entries(onetData.skills).forEach(([name, data]) => {
      const importance = data.Importance || 0;
      const level = data.Level || 0;
      const score = (importance * level) / 35;
      if (score > 0.5) {
        console.log(`   ${name}: I=${importance}, L=${level}, Score=${score.toFixed(3)}`);
      }
    });
    
    // Check knowledge
    console.log('\n📚 KNOWLEDGE:');
    Object.entries(onetData.knowledge).forEach(([name, data]) => {
      const importance = data.Importance || 0;
      const level = data.Level || 0;
      const score = (importance * level) / 35;
      if (score > 0.5) {
        console.log(`   ${name}: I=${importance}, L=${level}, Score=${score.toFixed(3)}`);
      }
    });
  }
  
       /**
   * Calculate score for a specific resistance factor
   */
   calculateFactorScore(factorConfig, onetData, jobContext, factorName) {
     let factorScore = 0;
     let elementCount = 0;
     let totalElementsConsidered = 0;
     let includedElements = 0;
     let details = {
       abilities: {},
       skills: {},
       knowledge: {}
     };

     console.log(`📊 Factor type: ${factorConfig.type}, Weight: ${factorConfig.weight}`);
     console.log(`📊 Elements to consider: ${factorConfig.elements.abilities.length} abilities, ${factorConfig.elements.skills.length} skills, ${factorConfig.elements.knowledge.length} knowledge`);

     // Process abilities
     console.log('\n🔧 PROCESSING ABILITIES:');
     factorConfig.elements.abilities.forEach(abilityName => {
       totalElementsConsidered++;
       if (onetData.abilities[abilityName]) {
         const importance = onetData.abilities[abilityName].Importance || 0;
         const level = onetData.abilities[abilityName].Level || 0;
         const rawScore = (importance * level) / 35;
         
         // Check if this element should be included based on context
         const shouldInclude = this.shouldIncludeElement(abilityName, 'ability', factorName, jobContext);
         
         console.log(`   ${abilityName}: I=${importance}, L=${level}, Raw=${rawScore.toFixed(3)}, Include=${shouldInclude}`);
         
         if (shouldInclude) {
           factorScore += rawScore;
           elementCount++;
           includedElements++;
           details.abilities[abilityName] = { importance, level, score: rawScore };
           
           if (rawScore > 0.3) {
             console.log(`   ✅ HIGH CONTRIBUTOR: ${abilityName} = ${rawScore.toFixed(3)}`);
           }
         }
       } else {
         console.log(`   ${abilityName}: NOT FOUND in O*NET data`);
       }
     });

     // Process skills
     console.log('\n💡 PROCESSING SKILLS:');
     factorConfig.elements.skills.forEach(skillName => {
       totalElementsConsidered++;
       if (onetData.skills[skillName]) {
         const importance = onetData.skills[skillName].Importance || 0;
         const level = onetData.skills[skillName].Level || 0;
         const rawScore = (importance * level) / 35;
         
         const shouldInclude = this.shouldIncludeElement(skillName, 'skill', factorName, jobContext);
         
         console.log(`   ${skillName}: I=${importance}, L=${level}, Raw=${rawScore.toFixed(3)}, Include=${shouldInclude}`);
         
         if (shouldInclude) {
           factorScore += rawScore;
           elementCount++;
           includedElements++;
           details.skills[skillName] = { importance, level, score: rawScore };
           
           if (rawScore > 0.3) {
             console.log(`   ✅ HIGH CONTRIBUTOR: ${skillName} = ${rawScore.toFixed(3)}`);
           }
         }
       } else {
         console.log(`   ${skillName}: NOT FOUND in O*NET data`);
       }
     });

     // Process knowledge
     console.log('\n📚 PROCESSING KNOWLEDGE:');
     factorConfig.elements.knowledge.forEach(knowledgeName => {
       totalElementsConsidered++;
       if (onetData.knowledge[knowledgeName]) {
         const importance = onetData.knowledge[knowledgeName].Importance || 0;
         const level = onetData.knowledge[knowledgeName].Level || 0;
         const rawScore = (importance * level) / 35;
         
         const shouldInclude = this.shouldIncludeElement(knowledgeName, 'knowledge', factorName, jobContext);
         
         console.log(`   ${knowledgeName}: I=${importance}, L=${level}, Raw=${rawScore.toFixed(3)}, Include=${shouldInclude}`);
         
         if (shouldInclude) {
           factorScore += rawScore;
           elementCount++;
           includedElements++;
           details.knowledge[knowledgeName] = { importance, level, score: rawScore };
           
           if (rawScore > 0.3) {
             console.log(`   ✅ HIGH CONTRIBUTOR: ${knowledgeName} = ${rawScore.toFixed(3)}`);
           }
         }
       } else {
         console.log(`   ${knowledgeName}: NOT FOUND in O*NET data`);
       }
     });

     // Calculate average score for this factor
     const avgScore = elementCount > 0 ? factorScore / elementCount : 0;
     
     // 3. Factor Score Breakdown
     console.log(`\n📊 ===== FACTOR SUMMARY: ${factorName} =====`);
     console.log(`Total elements considered: ${totalElementsConsidered}`);
     console.log(`Elements included after filtering: ${includedElements}`);
     console.log(`Raw total score: ${factorScore.toFixed(3)}`);
     console.log(`Average score: ${avgScore.toFixed(3)}`);
     console.log(`Factor weight: ${factorConfig.weight}`);
     console.log(`Weighted contribution: ${(avgScore * factorConfig.weight).toFixed(3)}`);
     
     // 6. Physical Factor Analysis - Special focus on physical_world_integration
     if (factorName === 'physical_world_integration') {
       console.log(`\n🔧 ===== PHYSICAL FACTOR ANALYSIS =====`);
       console.log(`Physical factor score: ${avgScore.toFixed(3)} (expected: 0.6-0.8 for plumbers)`);
       if (avgScore < 0.4) {
         console.log('⚠️  PHYSICAL FACTOR SCORE TOO LOW - INVESTIGATE MISSING ELEMENTS');
         console.log('Expected high contributors: Manual Dexterity, Static Strength, Gross Body Coordination');
       }
     }
     
     // 4. Vulnerability Analysis - Log any vulnerability factors with non-zero scores
     if (factorConfig.type === 'vulnerability' && avgScore > 0.1) {
       console.log(`\n⚠️  ===== VULNERABILITY FACTOR ANALYSIS =====`);
       console.log(`Vulnerability factor ${factorName} has score ${avgScore.toFixed(3)}`);
       console.log('This may indicate incorrect element assignment for physical jobs');
     }
     
     return {
       score: avgScore,
       details: {
         ...details,
         elementCount,
         totalElementsConsidered,
         includedElements,
         rawTotal: factorScore,
         avgScore
       }
     };
   }

   /**
    * Enhanced shouldIncludeElement with relative context consideration
    */
   shouldIncludeElement(elementName, elementType, factorName, jobContext) {
    // Default: include all elements
    let include = true;
    let reason = 'default (no special rules)';
  
    // Context-specific rules for ambiguous elements
    switch (elementName) {
      case 'Manual Dexterity':
        if (factorName === 'physical_world_integration') {
          // Include if job is more mechanical/physical than routine
          include = (jobContext.mechanical || jobContext.physical) && !jobContext.routine;
          reason = `physical_world_integration: mechanical=${jobContext.mechanical}, physical=${jobContext.physical}, routine=${jobContext.routine}`;
        } else if (factorName === 'routine_information_processing') {
          // Include if job is routine but not mechanical
          include = jobContext.routine && !jobContext.mechanical;
          reason = `routine_information_processing: routine=${jobContext.routine}, mechanical=${jobContext.mechanical}`;
        }
        break;
  
      case 'Monitoring':
      case 'Operations Monitoring':
        if (factorName === 'physical_world_integration') {
          // Diagnostic monitoring for mechanical systems
          include = jobContext.mechanical;
          reason = `physical_world_integration: mechanical=${jobContext.mechanical}`;
        } else if (factorName === 'routine_information_processing') {
          // Process monitoring for routine work
          include = jobContext.routine && !jobContext.mechanical;
          reason = `routine_information_processing: routine=${jobContext.routine}, mechanical=${jobContext.mechanical}`;
        } else if (factorName === 'sensory_pattern_recognition') {
          // Visual/sensory monitoring
          include = !jobContext.mechanical && !jobContext.routine;
          reason = `sensory_pattern_recognition: mechanical=${jobContext.mechanical}, routine=${jobContext.routine}`;
        } else if (factorName === 'digital_equipment_operation') {
          // Digital system monitoring
          include = jobContext.digital && !jobContext.mechanical;
          reason = `digital_equipment_operation: digital=${jobContext.digital}, mechanical=${jobContext.mechanical}`;
        }
        break;
  
      case 'Mathematical Reasoning':
      case 'Number Facility':
        if (factorName === 'digital_technical_work') {
          // Include if job is primarily digital
          include = jobContext.digital;
          reason = `digital_technical_work: digital=${jobContext.digital}`;
        } else if (factorName === 'structured_mathematical_work') {
          // Include if job is analytical but not digital
          include = jobContext.analytical && !jobContext.digital;
          reason = `structured_mathematical_work: analytical=${jobContext.analytical}, digital=${jobContext.digital}`;
        }
        break;
  
      case 'Operations Analysis':
        if (factorName === 'digital_technical_work') {
          // Digital systems analysis
          include = jobContext.digital;
          reason = `digital_technical_work: digital=${jobContext.digital}`;
        } else if (factorName === 'complex_problem_solving') {
          // Strategic analysis
          include = !jobContext.digital && !jobContext.routine;
          reason = `complex_problem_solving: digital=${jobContext.digital}, routine=${jobContext.routine}`;
        }
        break;
  
      case 'Quality Control Analysis':
        if (factorName === 'routine_information_processing') {
          // Routine quality checking
          include = jobContext.routine;
          reason = `routine_information_processing: routine=${jobContext.routine}`;
        } else if (factorName === 'sensory_pattern_recognition') {
          // Visual quality inspection
          include = !jobContext.routine;
          reason = `sensory_pattern_recognition: routine=${jobContext.routine}`;
        }
        break;
  
      case 'Critical Thinking':
        if (factorName === 'complex_problem_solving') {
          // Strategic thinking
          include = !jobContext.regulatory;
          reason = `complex_problem_solving: regulatory=${jobContext.regulatory}`;
        } else if (factorName === 'regulatory_legal_compliance') {
          // Regulatory decision making
          include = jobContext.regulatory;
          reason = `regulatory_legal_compliance: regulatory=${jobContext.regulatory}`;
        }
        break;

      case 'Reading Comprehension':
      case 'Written Comprehension':
      case 'Writing':
      case 'Written Expression':
        if (factorName === 'routine_information_processing') {
          // Only include for genuinely routine/clerical jobs
          include = jobContext.routine && !jobContext.mechanical && !jobContext.interpersonal;
          reason = `routine_information_processing: routine=${jobContext.routine}, mechanical=${jobContext.mechanical}, interpersonal=${jobContext.interpersonal}`;
        } else if (factorName === 'regulatory_legal_compliance') {
          // Professional reading/writing
          include = jobContext.regulatory;
          reason = `regulatory_legal_compliance: regulatory=${jobContext.regulatory}`;
        }
        break;

      case 'Equipment Selection':
      case 'Operation and Control':
        if (factorName === 'digital_equipment_operation') {
          // Only include for digital equipment, not mechanical
          include = jobContext.digital && !jobContext.mechanical;
          reason = `digital_equipment_operation: digital=${jobContext.digital}, mechanical=${jobContext.mechanical}`;
        }
        break;

      case 'Control Precision':
      case 'Rate Control':
      case 'Reaction Time':
        if (factorName === 'digital_equipment_operation') {
          // Only for digital equipment, not manual tools
          include = jobContext.digital && !jobContext.mechanical;
          reason = `digital_equipment_operation: digital=${jobContext.digital}, mechanical=${jobContext.mechanical}`;
        }
        break;

      case 'Information Ordering':
      case 'Perceptual Speed':
        if (factorName === 'routine_information_processing') {
          // Only for data processing jobs, not diagnostic work
          include = jobContext.routine && !jobContext.mechanical;
          reason = `routine_information_processing: routine=${jobContext.routine}, mechanical=${jobContext.mechanical}`;
        }
        break;

      case 'Visual Color Discrimination':
      case 'Near Vision':
      case 'Far Vision':
      case 'Selective Attention':
        if (factorName === 'sensory_pattern_recognition') {
          // Only for inspection/monitoring jobs, not general vision use
          include = !jobContext.mechanical && !jobContext.interpersonal;
          reason = `sensory_pattern_recognition: mechanical=${jobContext.mechanical}, interpersonal=${jobContext.interpersonal}`;
        }
        break;

        case 'Engineering and Technology':
  if (factorName === 'digital_technical_work' || factorName === 'digital_equipment_operation') {
    // Only vulnerable if genuinely digital, not mechanical
    include = jobContext.digital && !jobContext.mechanical;
  } else if (factorName === 'physical_world_integration') {
    // Protective for mechanical/physical engineering
    include = jobContext.mechanical;
  }
  break;

  case 'Mathematics':
  if (factorName === 'structured_mathematical_work') {
    // Only vulnerable if analytical/computational, not practical math
    include = jobContext.analytical && !jobContext.mechanical;
  } else if (factorName === 'physical_world_integration') {
    // Protective for practical math in physical work
    include = jobContext.mechanical;
  }
  break;
  
      default:
        // No special context rules - include by default
        break;
    }
  
    // 6. Context Filtering Verification - Log decisions for elements with high scores in vulnerability factors
    const vulnerabilityFactors = ['digital_technical_work', 'routine_information_processing', 'structured_mathematical_work', 'digital_equipment_operation', 'sensory_pattern_recognition'];
    if (vulnerabilityFactors.includes(factorName)) {
      console.log(`   🔍 CONTEXT DECISION: ${elementName} in ${factorName} = ${include} (${reason})`);
    }
    
    return include;
  }
  
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
  }

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
  }

  /**
   * Get resistance factor mappings from database
   */
  async getResistanceFactorMappings() {
    try {
      // Get factor definitions
      const { data: factors } = await supabase
        .from('resistance_factors')
        .select('*');

      // Get element mappings
      const { data: mappings } = await supabase
        .from('element_factor_mappings')
        .select('*');

      // Group mappings by factor
      const groupedMappings = {};
      
      factors.forEach(factor => {
        groupedMappings[factor.factor_name] = {
          weight: factor.weight,
          type: factor.factor_type,
          description: factor.description,
          elements: {
            skills: [],
            knowledge: [],
            abilities: []
          }
        };
      });

      mappings.forEach(mapping => {
        const factor = groupedMappings[mapping.factor_name];
        if (factor) {
          const elementType = mapping.element_type === 'ability' ? 'abilities' : 
                             mapping.element_type === 'skill' ? 'skills' : 'knowledge';
          factor.elements[elementType].push(mapping.element_name);
        }
      });

      return groupedMappings;
    } catch (error) {
      console.error('Error getting resistance factor mappings:', error);
      // Fallback to hardcoded mappings if database fails
      return this.getHardcodedMappings();
    }
  }

  /**
   * Hardcoded mappings as fallback
   */
  getHardcodedMappings() {
    return {
      physical_world_integration: {
        weight: 0.50,
        type: 'protection',
        elements: {
          abilities: ['Gross Body Coordination', 'Dynamic Flexibility', 'Stamina', 'Manual Dexterity', 'Multilimb Coordination', 'Extent Flexibility', 'Static Strength', 'Trunk Strength'],
          skills: ['Coordination', 'Troubleshooting', 'Repairing', 'Installation', 'Equipment Maintenance'],
          knowledge: ['Building and Construction', 'Mechanical', 'Production and Processing']
        }
      },
      human_interaction_empathy: {
        weight: 0.25,
        type: 'protection',
        elements: {
          abilities: ['Oral Expression', 'Speech Clarity', 'Oral Comprehension'],
          skills: ['Social Perceptiveness', 'Persuasion', 'Negotiation', 'Service Orientation', 'Active Listening', 'Speaking', 'Instructing'],
          knowledge: ['Psychology', 'Therapy and Counseling', 'Customer and Personal Service', 'Sociology and Anthropology']
        }
      },
      creative_artistic_expression: {
        weight: 0.20,
        type: 'protection',
        elements: {
          abilities: ['Originality', 'Fluency of Ideas', 'Visualization'],
          skills: [],
          knowledge: ['Fine Arts', 'History and Archeology', 'Philosophy and Theology', 'Communications and Media', 'Design']
        }
      },
      complex_problem_solving: {
        weight: 0.20,
        type: 'protection',
        elements: {
          abilities: ['Problem Sensitivity', 'Deductive Reasoning', 'Inductive Reasoning', 'Category Flexibility'],
          skills: ['Critical Thinking', 'Complex Problem Solving', 'Judgment and Decision Making', 'Systems Analysis', 'Systems Evaluation'],
          knowledge: ['Administration and Management', 'Personnel and Human Resources', 'Law and Government']
        }
      },
      regulatory_legal_compliance: {
        weight: 0.15,
        type: 'protection',
        elements: {
          abilities: ['Oral Expression', 'Written Expression'],
          skills: ['Critical Thinking', 'Judgment and Decision Making'],
          knowledge: ['Law and Government', 'Public Safety and Security', 'Medicine and Dentistry']
        }
      },
      digital_technical_work: {
        weight: -0.25,
        type: 'vulnerability',
        elements: {
          abilities: ['Mathematical Reasoning', 'Number Facility'],
          skills: ['Programming', 'Technology Design', 'Operations Analysis'],
          knowledge: ['Computers and Electronics', 'Engineering and Technology', 'Telecommunications']
        }
      },
      routine_information_processing: {
        weight: -0.20,
        type: 'vulnerability',
        elements: {
          abilities: ['Memorization', 'Perceptual Speed', 'Information Ordering', 'Written Comprehension', 'Written Expression', 'Finger Dexterity'],
          skills: ['Monitoring', 'Quality Control Analysis', 'Operations Monitoring', 'Reading Comprehension', 'Writing'],
          knowledge: ['Administrative', 'Economics and Accounting', 'Clerical']
        }
      },
      structured_mathematical_work: {
        weight: -0.25,
        type: 'vulnerability',
        elements: {
          abilities: ['Mathematical Reasoning', 'Number Facility'],
          skills: ['Mathematics', 'Science'],
          knowledge: ['Mathematics', 'Economics and Accounting']
        }
      },
      digital_equipment_operation: {
        weight: -0.20,
        type: 'vulnerability',
        elements: {
          abilities: ['Control Precision', 'Rate Control', 'Reaction Time'],
          skills: ['Equipment Selection', 'Operation and Control', 'Operations Monitoring'],
          knowledge: ['Computers and Electronics', 'Engineering and Technology']
        }
      },
      sensory_pattern_recognition: {
        weight: -0.15,
        type: 'vulnerability',
        elements: {
          abilities: ['Visual Color Discrimination', 'Night Vision', 'Far Vision', 'Near Vision', 'Depth Perception', 'Auditory Attention', 'Speech Recognition', 'Selective Attention'],
          skills: ['Monitoring', 'Quality Control Analysis'],
          knowledge: []
        }
      }
    };
  }

  /**
   * Cache calculation result
   */
  async cacheResult(socCode, score, factorScores, breakdown) {
    try {
      await supabase
        .from('job_analysis_cache')
        .upsert({
          soc_code: socCode,
          algorithm_version: this.algorithmVersion,
          resistance_score: score,
          factor_scores: factorScores,
          breakdown: breakdown,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error caching result:', error);
      // Non-fatal error, continue without caching
    }
  }

  /**
   * Find SOC code by job title using alternate titles
   */
  async findSOCByTitle(jobTitle) {
    try {
      const { data: matches } = await supabase
        .from('alternate_titles')
        .select(`
          soc_code,
          title,
          occupations!inner(title)
        `)
        .ilike('title', `%${jobTitle}%`)
        .limit(10);

      return matches || [];
    } catch (error) {
      console.error('Error finding SOC by title:', error);
      return [];
    }
  }

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
  }

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

      // 2. Partial match
      const { data: partialMatches } = await supabase
        .from('alternate_titles')
        .select(`
          soc_code,
          alternate_title,
          occupations (title, description)
        `)
        .ilike('alternate_title', `%${normalizedQuery}%`)
        .limit(10);

      if (partialMatches?.length > 0) {
        return partialMatches.map(match => ({
          soc_code: match.soc_code,
          title: match.occupations.title,
          matched_term: match.alternate_title,
          match_type: 'partial'
        }));
      }

      // 3. Word-based search
      const words = normalizedQuery.split(' ').filter(w => w.length > 2);
      if (words.length > 0) {
        const { data: wordMatches } = await supabase
          .from('alternate_titles')
          .select(`
            soc_code,
            alternate_title,
            occupations (title, description)
          `)
          .or(words.map(word => `alternate_title.ilike.%${word}%`).join(','))
          .limit(10);

        if (wordMatches?.length > 0) {
          return wordMatches.map(match => ({
            soc_code: match.soc_code,
            title: match.occupations.title,
            matched_term: match.alternate_title,
            match_type: 'word'
          }));
        }
      }

      return [];
    } catch (error) {
      console.error('Error searching job titles:', error);
      return [];
    }
  }

  /**
   * Get occupation data by SOC code
   */
  async getOccupationData(socCode) {
    try {
      const { data: occupation, error } = await supabase
        .from('occupations')
        .select('*')
        .eq('soc_code', socCode)
        .single();

      if (error) {
        console.error('Error getting occupation data:', error);
        return null;
      }

      return occupation;
    } catch (error) {
      console.error('Error getting occupation data:', error);
      return null;
    }
  }

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
          resistance_score: resistanceScore,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error logging user query:', error);
      // Non-fatal error, continue without logging
    }
  }

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
  }

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
  }

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

  /**
   * Analyze job with full workflow
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
      
      // Get factor mappings for UI transformation
      const factorMappings = await this.getResistanceFactorMappings();
      
      // Log the query
      await this.logUserQuery(jobTitle, bestMatch.soc_code, analysis.score);

      // Transform breakdown object to array format for UI
      const breakdownArray = Object.entries(analysis.factorScores).map(([factorName, score]) => {
        const factorConfig = factorMappings[factorName];
        const contribution = score * factorConfig.weight;
        return {
          factor: factorName,
          score: score,
          contribution: contribution,
          type: factorConfig.type,
          weight: factorConfig.weight
        };
      });

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
          breakdown: breakdownArray,
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
  }
}

// Export singleton instance
export const aiResistanceServiceV2 = new AIResistanceServiceV2();
export default aiResistanceServiceV2;