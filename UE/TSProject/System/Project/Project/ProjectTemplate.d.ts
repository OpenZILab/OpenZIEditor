export declare class ProjectTemplate {
    private myDir;
    constructor(dir: string);
    Test(): void;
    GetThumbnail(): string;
    GetPreviews(): string[];
    GetInformationDir(): string;
    GetDescription(): any;
    private findProjectFile;
    Visualization(dir: string, name: string): string;
    private copyAddition;
    private copyToTarget;
}
