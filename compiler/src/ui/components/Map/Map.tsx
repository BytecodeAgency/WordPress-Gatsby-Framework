import React from 'react';
import styled from 'styled-components';
import Theme from '@wp-compiler/types/request/Theme';
import { Col } from 'react-grid-system';

const GoogleMapsMap: React.FC<MapProps> = ({ theme, map, sizes }) => {
    const src = map.address ? map.address : `${map.lat},${map.lng}`;
    return (
        <StyledCol md={sizes.md} sm={sizes.sm}>
            <StyledIframe
                width={'100%'}
                height={'100%'}
                id={'gmap_canvas'}
                src={
                    // tslint:disable-next-line: max-line-length
                    `https://maps.google.com/maps?q=${src}&t=&z=13&ie=UTF8&iwloc=&output=embed`
                }
                scrolling={'no'}
            />
        </StyledCol>
    );
};

export default GoogleMapsMap;

const StyledCol = styled(Col)`
    height: auto;
    padding: 0;
`;

const StyledIframe = styled.iframe`
    min-height: 100vh;
`;

interface MapProps {
    sizes: { sm: number; md: number };
    map: { address: string; lat: string; lng: string };
    theme: Theme;
}
