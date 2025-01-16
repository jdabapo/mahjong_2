import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Tile as TileType } from '../../../common/types';

import { Tile } from './Tile';
import { Container, SimpleGrid } from '@mantine/core';


export const DiscardZone = () => {
  const [discardState, setDiscardState] = useState([]);

  const highlightStyle = {
    border: '2px solid red',
    borderRadius: '4px'
  };

  return (
    <Container size="lg" style={{ padding: '20px' }}> {/* Adjust container size and padding */}
      <ReactSortable
        list={discardState}
        setList={setDiscardState}
        group={{ name: 'shared', pull: false, put: true }}
      >
        <SimpleGrid cols={4} spacing={0}>
          {discardState.map((item: TileType, index) => (
            <div 
              key={item.id} 
              style={index === discardState.length - 1 ? highlightStyle : null}
            >
              <Tile id={index}suit={item.suit} value={item.value} />
            </div>
          ))}
        </SimpleGrid>
      </ReactSortable>
    </Container>
  )
};

