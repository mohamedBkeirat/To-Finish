// @vitest-environment jsdom

import saveToStorage from "./saveToStorage";
import { expect, it, describe, vi } from 'vitest'

describe('test suite: saveToStorage',()=>{

  it('writes a value to localStorage', () => {
    
    const setItemSpy = vi.spyOn(window.localStorage, 'setItem');
    
    saveToStorage('theme', {look:'dark'});

    expect(setItemSpy).toHaveBeenCalledWith('theme', JSON.stringify({ look: 'dark' }));
  });
})