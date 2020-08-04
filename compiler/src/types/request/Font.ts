interface Font {
    name: string;
    weightsavailable: string[];
    weightdefault: string;
    [key: string]: string|string[];
}

export default Font;
