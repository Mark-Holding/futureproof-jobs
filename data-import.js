// data-import.js
// Script to import O*NET Excel files into Supabase
// Run with: node data-import.js
require('dotenv').config();

console.log("✅ SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("✅ SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);

const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for imports
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// File paths - adjust to your Excel file locations
const dataFiles = {
  occupations: './data/1 Occupation Data SOC codes.xlsx',
  alternateTitles: './data/1.1 Alternate Titles.xlsx',
  contentModel: './data/5 Content Model Reference 1.xlsx',
  skills: './data/2 Skills.xlsx',
  knowledge: './data/3 Knowledge 1.xlsx',
  abilities: './data/4 Abilities.xlsx'
};

// Utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const batchInsert = async (table, data, batchSize = 1000) => {
  console.log(`Importing ${data.length} records to ${table}...`);
  
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    
    const { error } = await supabase
      .from(table)
      .insert(batch);
    
    if (error) {
      console.error(`Error inserting batch ${i}-${i + batchSize} to ${table}:`, error);
      throw error;
    }
    
    console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(data.length/batchSize)} to ${table}`);
    await delay(100); // Prevent rate limiting
  }
  
  console.log(`✅ Completed importing ${data.length} records to ${table}`);
};

// Import functions for each data type
const importOccupations = async () => {
  console.log('\n🔄 Importing Occupations...');
  
  const workbook = XLSX.readFile(dataFiles.occupations);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  const occupations = data.slice(1).map(row => ({
    soc_code: row[0],
    title: row[1],
    description: row[2]
  })).filter(occ => occ.soc_code && occ.title);
  
  await batchInsert('occupations', occupations);
  return occupations.length;
};

const importAlternateTitles = async () => {
  console.log('\n🔄 Importing Alternate Titles...');
  
  const workbook = XLSX.readFile(dataFiles.alternateTitles);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  const alternateTitles = data.slice(1).map(row => ({
    soc_code: row[0],
    alternate_title: row[2],
    short_title: row[3] || null,
    source_code: row[4]
  })).filter(title => title.soc_code && title.alternate_title);
  
  await batchInsert('alternate_titles', alternateTitles);
  return alternateTitles.length;
};

const importContentModel = async () => {
  console.log('\n🔄 Importing Content Model...');
  
  const workbook = XLSX.readFile(dataFiles.contentModel);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  const contentModel = data.slice(1).map(row => {
    const elementId = row[0];
    let elementType = 'unknown';
    
    if (elementId.startsWith('1.A')) elementType = 'ability';
    else if (elementId.startsWith('2.A')) elementType = 'skill';
    else if (elementId.startsWith('2.C')) elementType = 'knowledge';
    
    return {
      element_id: elementId,
      element_name: row[1],
      description: row[2],
      element_type: elementType
    };
  }).filter(item => item.element_id && item.element_name);
  
  await batchInsert('content_model', contentModel);
  return contentModel.length;
};

const importSkillsData = async () => {
  console.log('\n🔄 Importing Skills Data...');
  
  const workbook = XLSX.readFile(dataFiles.skills);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  const skillsData = data.slice(1).map(row => ({
    soc_code: row[0],
    element_id: row[2],
    element_name: row[3],
    scale_type: row[5], // 'Importance' or 'Level'
    data_value: parseFloat(row[6]) || null,
    n: parseInt(row[7]) || null,
    standard_error: parseFloat(row[8]) || null,
    lower_ci: parseFloat(row[9]) || null,
    upper_ci: parseFloat(row[10]) || null,
    recommend_suppress: row[11] === 'Y',
    not_relevant: row[12] === 'Y',
    date_collected: row[13] ? new Date(row[13]) : null,
    domain_source: row[14]
  })).filter(skill => skill.soc_code && skill.element_id);
  
  await batchInsert('skills_data', skillsData);
  return skillsData.length;
};

const importKnowledgeData = async () => {
  console.log('\n🔄 Importing Knowledge Data...');
  
  const workbook = XLSX.readFile(dataFiles.knowledge);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  const knowledgeData = data.slice(1).map(row => ({
    soc_code: row[0],
    element_id: row[2],
    element_name: row[3],
    scale_type: row[5], // 'Importance' or 'Level'
    data_value: parseFloat(row[6]) || null,
    n: parseInt(row[7]) || null,
    standard_error: parseFloat(row[8]) || null,
    lower_ci: parseFloat(row[9]) || null,
    upper_ci: parseFloat(row[10]) || null,
    recommend_suppress: row[11] === 'Y',
    not_relevant: row[12] === 'Y',
    date_collected: row[13] ? new Date(row[13]) : null,
    domain_source: row[14]
  })).filter(knowledge => knowledge.soc_code && knowledge.element_id);
  
  await batchInsert('knowledge_data', knowledgeData);
  return knowledgeData.length;
};

const importAbilitiesData = async () => {
  console.log('\n🔄 Importing Abilities Data...');
  
  const workbook = XLSX.readFile(dataFiles.abilities);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  const abilitiesData = data.slice(1).map(row => ({
    soc_code: row[0],
    element_id: row[2],
    element_name: row[3],
    scale_type: row[5], // 'Importance' or 'Level'
    data_value: parseFloat(row[6]) || null,
    n: parseInt(row[7]) || null,
    standard_error: parseFloat(row[8]) || null,
    lower_ci: parseFloat(row[9]) || null,
    upper_ci: parseFloat(row[10]) || null,
    recommend_suppress: row[11] === 'Y',
    not_relevant: row[12] === 'Y',
    date_collected: row[13] ? new Date(row[13]) : null,
    domain_source: row[14]
  })).filter(ability => ability.soc_code && ability.element_id);
  
  await batchInsert('abilities_data', abilitiesData);
  return abilitiesData.length;
};

// Main import function
const runImport = async () => {
  console.log('🚀 Starting O*NET Data Import to Supabase...\n');
  
  const startTime = Date.now();
  const results = {};
  
  try {
    // Verify file existence
    console.log('📋 Checking file existence...');
    for (const [name, filepath] of Object.entries(dataFiles)) {
      if (!fs.existsSync(filepath)) {
        throw new Error(`File not found: ${filepath}`);
      }
      console.log(`✅ Found: ${name} - ${filepath}`);
    }
    
    // Import in dependency order
    results.occupations = await importOccupations();
    results.alternateTitles = await importAlternateTitles();
    results.contentModel = await importContentModel();
    results.skills = await importSkillsData();
    results.knowledge = await importKnowledgeData();
    results.abilities = await importAbilitiesData();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n🎉 Import completed successfully!');
    console.log('📊 Import Summary:');
    console.log(`   Occupations: ${results.occupations.toLocaleString()}`);
    console.log(`   Alternate Titles: ${results.alternateTitles.toLocaleString()}`);
    console.log(`   Content Model: ${results.contentModel.toLocaleString()}`);
    console.log(`   Skills Data: ${results.skills.toLocaleString()}`);
    console.log(`   Knowledge Data: ${results.knowledge.toLocaleString()}`);
    console.log(`   Abilities Data: ${results.abilities.toLocaleString()}`);
    console.log(`   Total Records: ${Object.values(results).reduce((a, b) => a + b, 0).toLocaleString()}`);
    console.log(`   Duration: ${duration} seconds`);
    
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  runImport();
}

module.exports = { runImport };
