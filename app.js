
const fs = require('fs');

// Função para ler o arquivo de texto e retornar o conteúdo como uma string
function readSemanticNetworkFromFile() {
  try {
    const data = fs.readFileSync('c:\\Users\\Perin\\Documents\\C Trabalho\\RedeSemantica\\rede_semantica.txt', 'utf8');
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Função para criar a rede semântica a partir do conteúdo do arquivo
function createSemanticNetworkFromText(content) {
  try {
    return JSON.parse(content);
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Lê o conteúdo do arquivo
const fileContent = readSemanticNetworkFromFile();

// Cria a rede semântica a partir do conteúdo do arquivo
const semanticNetwork = createSemanticNetworkFromText(fileContent);

// Função para pesquisar relações de um conceito na rede semântica
function searchRelations(concept, exploredConcepts = []) {
    if (exploredConcepts.includes(concept)) {
      return; // Evitar loop infinito em caso de ciclos na rede semântica
    }
    
    const relations = semanticNetwork[concept];
    if (relations) {
      console.log(`Relações do conceito "${concept}":`);
      for (let relation in relations) {
        if (relation === "come") {
          if (relations[relation].length > 0) {
            console.log(`${relation}: ${relations[relation].join(", ")}`);
          } else {
            console.log(`${relation}: Nenhum valor`);
          }
        } else {
          console.log(`${relation}: ${relations[relation].join(", ")}`);
        }
      }
      
      exploredConcepts.push(concept);
      
      for (let relation in relations) {
        if (relation === "é_um") {
          for (let relatedConcept of relations[relation]) {
            searchRelations(relatedConcept, exploredConcepts);
          }
        }
      }
    } else {
      console.log(`O conceito "${concept}" não está presente na rede semântica.`);
    }
  }

searchRelations("gato");
