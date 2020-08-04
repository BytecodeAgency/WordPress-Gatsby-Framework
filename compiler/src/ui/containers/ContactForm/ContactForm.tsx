import React from 'react';
import Button from '@wp-compiler/ui/components/Button/Button';
import styled from 'styled-components';

const ContactFormBase = () => (
    <Button>Send</Button>
);

const ContactForm = styled(ContactFormBase)`
    color: red;
`;

export default ContactForm;
