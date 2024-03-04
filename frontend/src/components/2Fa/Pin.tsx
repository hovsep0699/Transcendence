import * as React from 'react'
import { usePinInput } from 'react-pin-input-hook'

function Pin() {
  const [values, setValues] = React.useState(Array(6).fill(''));
  const { fields } = usePinInput({
    values,
    onChange: (values) => {
      setValues(values);
    },
  });

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
    <div className="flex">
      {fields.map((propsField, index) => (
        <input
          key={index}
          className="border border-gray-300 rounded-lg p-3 mx-1 text-center w-10 h-10 text-lg font-semibold focus:outline-none focus:border-blue-500 bg-white"
          {...propsField}
        />
      ))}
    </div>
  </div>
  );
}

export default Pin;
