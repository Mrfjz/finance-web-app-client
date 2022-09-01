import useLocalStorage from './useLocalStorage';

const useInput = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue); //combine with local storage

    const reset = () => { setValue(initValue) }; // reset the state value

    const attributeObj = {
        value, // handle the display 
        onChange: (e) => setValue(e.target.value) // handle the onChange 
    }

    return [value, reset, attributeObj];

}

export default useInput