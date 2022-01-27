import React from 'react'
import propTypes from 'prop-types'

const InputField = (props) => {
  const { label, htmlFor, ...otherProps } = props
  return (
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <label htmlFor={htmlFor} className="sr-only">
          {label}
        </label>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          {...otherProps}
        />
      </div>
    </div>
  )
}

const string = propTypes.string.isRequired
InputField.propTypes  = {
  name: string,
  id: string,
  type: string,
  autoComplete: propTypes.string,
  required: propTypes.bool.isRequired,
  placeholder: string,
  htmlFor: string,
  label: string,
  value: string,
  onChange: propTypes.func.isRequired,
}

export default InputField