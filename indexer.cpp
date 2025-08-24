#include <iostream>
#include <string>
#include <regex>
#include <unordered_map>
#include <vector>
#include <fstream>
#include <filesystem>
#include <sstream>
using namespace std;

namespace fs = filesystem;

unordered_map<string, vector<string>> invertedIndex;

string cleanWord(const string& word) {
    return regex_replace(word, regex("[^a-zA-Z0-9_]"), "");
}

void indexLinePhrases(const string& line, const string& filePath) {
    stringstream oss(line);
    vector<string> tokensWithSymbols;
    string w;

    while (oss >> w) {
        tokensWithSymbols.push_back(w);
        invertedIndex[w].push_back(filePath); 
    }

    stringstream ss(line);
    string word;
    vector<string> cleanedWords;

    while (ss >> word) {
        word = cleanWord(word);
        transform(word.begin(), word.end(), word.begin(), ::tolower);
        if (!word.empty()) {
            cleanedWords.push_back(word);
            invertedIndex[word].push_back(filePath); 
        }
    }

    
    if (!tokensWithSymbols.empty()) {
        string fullWithSymbols = tokensWithSymbols[0];
        for (size_t i = 1; i < tokensWithSymbols.size(); ++i)
            fullWithSymbols += " " + tokensWithSymbols[i];
        invertedIndex[fullWithSymbols].push_back(filePath);
    }

    if (!cleanedWords.empty()) {
        string fullClean = cleanedWords[0];
        for (size_t i = 1; i < cleanedWords.size(); ++i)
            fullClean += " " + cleanedWords[i];
        invertedIndex[fullClean].push_back(filePath);
    }
}

void indexFile(const string& filePath) {
    ifstream in(filePath);
    string line;
    while (getline(in, line)) {
        indexLinePhrases(line, filePath);
    }
}

void indexDirectory(const string& path) {
    for (const auto& entry : fs::recursive_directory_iterator(path)) {
        if (entry.is_regular_file()) {
            string ext = entry.path().extension().string();
            if (ext == ".cpp" || ext == ".html" || ext == ".js") {
                indexFile(entry.path().string());
            }
        }
    }
}

void writeIndexToFile(const string& outputPath) {
    ofstream out(outputPath);
    for (const auto& [word, files] : invertedIndex) {
        out << word << ":";
        for (const auto& f : files) {
            out << " " << f;
        }
        out << "\n";
    }
}

int main() {
    string folderPath = "./codebase";
    string outputIndex = "index.txt";

    indexDirectory(folderPath);
    writeIndexToFile(outputIndex);

    cout << "Indexing complete. Output saved to index.txt" << endl;
    return 0;
}
