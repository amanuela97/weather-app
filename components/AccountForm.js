import { useRef, useState, useEffect } from 'react'
import SelectMenu from './SelectMenu'
import { Switch } from '@headlessui/react'
import Autocomplete from 'react-google-autocomplete'
import { useAuth } from '../utils/AuthUserContext'


const AccountForm = () => {
  const { clearError, AddAccountInfo, GetAccountInfo } = useAuth()
  const myRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [location, setLocation] = useState('')
  const [frequency, setFrequency] = useState('')
  const [disable, setDisable] = useState(false)
  const [message, setMessage] = useState({
    type: null,
    message: null,
  })

  const submit = async (event) => {
    event.preventDefault()
    setDisable(true)
    if(!location || !myRef.current.getMyState()) {
      console.log('here', myRef.current.getMyState())
      setMessage({ type: 'error', message: 'Can not save with empty fields' })
      clearError(setMessage)
      return
    }

    const valid = await isLocationValid()
    if(valid){
      const result = await AddAccountInfo(myRef.current.getMyState(), location, enabled)
      if(result === 'success'){
        setMessage({ type: 'sucess', message: 'Account was successfully updated :)' })
        clearError(setMessage)
      }else {
        console.log(result)
        setMessage({ type: 'error', message: 'failed to update account :(' })
        clearError(setMessage)
      }
      setDisable(false)
    }else {
      setDisable(false)
      setMessage({ type: 'error', message: 'weather data for this location is not available, pick another location' })
      clearError(setMessage)
    }

  }

  const isLocationValid =  async () => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/tomorrow?unitGroup=metric&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&contentType=json`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if(data?.address){
        return true
      }
      return false
    } catch (error) {
      console.clear()
      return false
    }
  }

  useEffect( () => {
    async function fetchData(){
      const response = await GetAccountInfo()
      if(response) {
        setEnabled(response.status)
        setLocation(response.location)
        setFrequency(response.frequency)
      }
    }
    return fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='flex justify-center md:w-4/5 w-full mt-6 mb-6'>
      <div className='block rounded-lg bg-gray-100 w-5/6 h-screen md:h-full text-center'>
        <label htmlFor="label" className="block mb-2 text-gray-700 font-medium text-xl mt-6"
        >Account Setting
        </label>
        <p className="w-full m-auto md:w-1/2">
            Your account settings will be used to tailor the app according to your configurations.
            Pick your city, and frequency to receive regular weather updates, and make sure to save your changes.
        </p>
        <hr className="my-6 dark:border-gray-600" />
        <form onSubmit={submit}>
          <div>
            <label htmlFor="frequency">frequency:</label>
            <SelectMenu options={['Daily', 'Monthly']} defaultvalue={frequency} ref={myRef}/>
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              onPlaceSelected={(place) => {
                setLocation(place?.formatted_address)
              }}
              onChange={({ target } ) => setLocation(target.value)}
              defaultValue={location}
              language='en'
              className='block border-2 border-gray-200 mb-5 w-full md:w-96 m-auto p-2'
            />
            <>
              {message?.message && <pre className={message.type === 'error' ? 'text-red-600 tx-sm w-full break-words overflow-hidden justify-center ' : 'text-green-600 tx-sm w-full break-words overflow-hidden justify-center ' }>
                {message.message}
              </pre>}
            </>
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <div className="py-4">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-gray-800' : 'bg-gray-200'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
            </div>
          </div>
          <button
            disabled={disable}
            type='submit'
            className="inline-block px-6 py-2 mt-4 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
            save
          </button>
        </form>
      </div>
    </div>
  )
}

export default AccountForm