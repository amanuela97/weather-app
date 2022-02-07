import React, { useState, useEffect, useImperativeHandle } from 'react'
import propTypes from 'prop-types'

const SelectMenu = React.forwardRef(( { options, defaultvalue }, ref) => {
  const [selected, setSelected] = useState( defaultvalue ? defaultvalue : '')



  useImperativeHandle(ref, () => ({ getMyState: () => {return selected} }), [selected])


  useEffect(() => {

  }, [defaultvalue])
  return (
    <div className="flex justify-center">
      <div className="mb-3 w-96 md:w-96">
        <select className="form-select appearance-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" defaultValue={selected}>
          {options.map((option, index) => (
            <option value={option} key={index} onClick={({ target }) => setSelected(target.value)}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
})

SelectMenu.propTypes = {
  options: propTypes.array.isRequired,
  defaultvalue: propTypes.string,
}

SelectMenu.displayName = 'SelectMenu'

export default SelectMenu