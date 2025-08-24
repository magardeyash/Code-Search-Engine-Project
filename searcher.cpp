#include <iostream>
#include <string>
#include <regex>
#include <unordered_map>
#include <set>
#include <vector>
#include <fstream>
#include<filesystem>
#include <sstream>
#include <algorithm>

using namespace std;

unordered_map<string, vector<string>> invertedIndex;

string cleanString(const string& str) {
    string cleaned;
    for (char c : str) {
        if (isalnum(c) || c == '_') cleaned += tolower(c);
        else cleaned += ' ';
    }
    cleaned.erase(unique(cleaned.begin(), cleaned.end(), [](char a, char b) {
        return isspace(a) && isspace(b);
    }), cleaned.end());
    return cleaned;
}

void loadIndexFromFile(const string& indexPath) {
    ifstream in(indexPath);
    string line;
    while (getline(in, line)) {
        stringstream ss(line);
        string key;
        getline(ss, key, ':');

        string file;
        while (ss >> file) {
            invertedIndex[key].push_back(file);
        }
    }
}

vector<string> uniqueSorted(const vector<string>& files) {
    set<string> s(files.begin(), files.end());
    return vector<string>(s.begin(), s.end());
}

void printResults(const vector<string>& files, const string& label) {
    cout << "\n" << label << ":\n";
    for (const auto& file : files) {
        cout << "- " << file << endl;
    }
}

void searchQuery(const string& rawQuery) {
    if (rawQuery.empty()) {
        cout << "Empty query." << endl;
        return;
    }

    string cleaned = cleanString(rawQuery);
    if (invertedIndex.count(rawQuery)) {
        printResults(uniqueSorted(invertedIndex[rawQuery]), "Exact Match (with symbols)");
        return;
    } else if (invertedIndex.count(cleaned)) {
        printResults(uniqueSorted(invertedIndex[cleaned]), "Exact Match (cleaned)");
        return;
    }

    stringstream ss(cleaned);
    string word;
    vector<string> words;
    while (ss >> word) {
        if (!word.empty()) words.push_back(word);
    }

    if (words.empty()) {
        cout << "No valid word found." << endl;
        return;
    }

    vector<string> result;
    for (size_t i = 0; i < words.size(); ++i) {
        auto it = invertedIndex.find(words[i]);
        if (it == invertedIndex.end()) {
            cout << "Word not found in index: '" << words[i] << "'\n";
            return;
        }

        vector<string> files = uniqueSorted(it->second);
        if (i == 0) result = files;
        else {
            vector<string> temp;
            set_intersection(result.begin(), result.end(), files.begin(), files.end(), back_inserter(temp));
            result = temp;
        }
    }

    if (!result.empty()) {
        printResults(result, "All words found in");
    } else {
        cout << "❌ No file contains all words together." << endl;
    }
}

int main() {
    string indexPath = "index.txt";
    loadIndexFromFile(indexPath);

    string queryLine;
    cout << "\nHybrid Search Engine Ready!\nSearch by word, phrase or sentence (type 'exit' to quit):\n";
    while (true) {
        cout << "\nSearch query: ";
        getline(cin, queryLine);
        if (queryLine == "exit") break;
        searchQuery(queryLine);
    }

    return 0;
}
