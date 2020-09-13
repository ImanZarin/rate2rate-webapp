export class Constants {
    static waitShort: number = 2000;
    static waitNormal: number = 4000;
    static waitLong: number = 8000;
    static waitForNextFetch = 10000;

    static get apiBaseUrl(): string | undefined {
        return process.env.REACT_APP_BASE_URL;
    }
}    