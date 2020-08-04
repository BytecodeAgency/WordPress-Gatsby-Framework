interface Form{
    type: 'form';
    submit: string;
    title: string;
    fields: InputType[];
    sizes: {md: number, sm: number};
    submit_url: string;
}

export interface InputType{
    name: string;
    placeholder: string;
    type: string;
    required: boolean;
}

export default Form;
