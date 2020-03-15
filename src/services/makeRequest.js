import React, {useCallback, useEffect, useMemo, useState} from "react"

import ContactService from "./contactsService"
import Spinner from "../components/spinner/Spinner"

const id = 1

const ContactInfo = () => {
    const { data, loading, error } = useContactInfo()

    const setError = (
        <div>
            {id} - {error}
        </div>
    )

    const setData = (
        <div>
            {id} - {JSON.stringify(data)}
        </div>
    )

    const setLoading = <Spinner />

    return loading ? setLoading : error ? setError : setData
}

const useRequest = (request) => {
    const initialState = useMemo(() => ({ data: null, loading: true, error: null, code: 0 }), [])

    const [ dataState, setDataState ] = useState(initialState)

    useEffect(() => {
        setDataState(initialState)
        let cancelled = false
        request()
            .then((data) => {
                return setDataState({...initialState, data, loading: false})
                // return success
                //     ? !cancelled && setDataState({...initialState, data, loading: false})
                //     : !cancelled && setDataState({...initialState, loading: false, error, code })
            })
            .catch((error) => {
                return !cancelled && setDataState({data: null, loading: false, error, code: 10 })
            })
        return () => cancelled = true
    }, [request, initialState])

    return dataState
}

const useContactInfo = () => {
    const request = useCallback(() => ContactService.getContacts(), [])

    return useRequest(request)
}

export {
    useContactInfo
}

export default ContactInfo
