/*
Hi! Need help with React Testing Library? The best way to get it is by forking
this repository, making a reproduction of your issue (or showing what you're
trying to do), and posting a link to your fork on our Discord chat:

https://testing-library.com/discord
*/

// here's an example
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';

function Counter({onAdvance}) {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
      </ul>
      <button onClick={async () => {
          // something async
          await new Promise(r => setTimeout(r, 0));
          
          onAdvance({transitionTo: 'next'});
      }}>click me</button>
    </>
  );
}

test('toBeCalledWith + waitFor', async () => {
    const onAdvance = jest.fn();
    render(<Counter onAdvance={onAdvance} />);
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() =>{
        expect(onAdvance).toBeCalledWith({ transitionto: 'next'});
    });
});

test('toBeCalledWith no waitfor', async () => {
    const onAdvance = jest.fn();
    render(<Counter onAdvance={onAdvance} />);
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    await new Promise(r => setTimeout(r, 0));

    expect(onAdvance).toBeCalledWith({ transitionto: 'next'});
});
