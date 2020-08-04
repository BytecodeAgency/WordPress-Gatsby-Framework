interface Image {
    type: 'image';
    image: string;
    hover_content: string;
    sizes: {md: number, sm: number};
}

export default Image;
