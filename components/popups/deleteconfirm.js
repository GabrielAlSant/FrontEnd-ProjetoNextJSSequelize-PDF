import react from "react";

export default function Popup(props) {
    return (props.trigger)? (
        <div className="backconfirm">
<div className="popupa">
     {props.children}
    <button onClick={(e)=> props.setTrigger(false)}>Cancelar</button>
</div>
        </div>
    ): ""
    }

