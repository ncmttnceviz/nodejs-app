import * as fs from "fs";
import path from "path";

export class LanguageService {
    private lang: string = process.env.APP_LANG!

    trans(key: string): string {
        const file = this.getLanguageFile();
        if (file instanceof Map) {
            const value = file.get(key);
            if (typeof value === 'undefined') return key;
            return value;
        }
        return key;
    }

    private getLanguageFile(): Map<string, string> | boolean {
        try {
            const file = fs.readFileSync(path.join(__dirname, `../../translations/${this.lang}.json`))
            const toString = file.toString('utf-8');
            const jsonData = JSON.parse(toString)
            return new Map(Object.entries(jsonData))
        } catch (e) {
            return false
        }

    }
}

export const languageService = new LanguageService();