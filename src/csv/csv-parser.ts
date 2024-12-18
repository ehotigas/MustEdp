import { Readable } from 'stream';
import csv from 'csv-parser';


export interface ICsvParser {
    parse<T>(content: string, options?: csv.Options, formatter?: (row: T) => T): Promise<T[]>;
}


export class CsvParser implements ICsvParser {
    public async parse<T>(content: string, options?: csv.Options, formatter?: (row: T) => T): Promise<T[]> {
        return new Promise((resolve, reject) => {
            const results: T[] = [];
            const readableStream = Readable.from([content]);

            readableStream.pipe(csv(options)).on('data', (data) => {
                results.push(formatter ? formatter(data) : data);
            }).on('end', () => {
                resolve(results);
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
}
