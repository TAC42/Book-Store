import { eventBusService } from "../../services/event-bus.service.js"
const { useState, useEffect, useRef } = React

export function UserMsg() {
    const [msg, setMsg] = useState('')
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            window.scrollTo({ top: 0, behavior: 'smooth' })
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        setMsg('')
    }

    if (!msg) return <React.Fragment></React.Fragment>
    return (
        <section className={`user-msg ${msg.type}`}>
            <button onClick={closeMsg}>x</button>
            {msg.txt}
        </section>
    )
}
