import React from 'react';
import SVGCircle from "@/components/atoms/svg-circle";
import {Checkbox} from "@/components/atoms/checkbox";

function Done({loading, handleCheckChange, checked}: {
    loading: boolean;
    checked: boolean;
    handleCheckChange: (e: boolean) => void
}) {
    return (
        <div className={"flex items-center mx-2"}>
            {loading ? <span>
          <SVGCircle />
        </span> :  <Checkbox checked={checked} onCheckedChange={handleCheckChange} className="rounded-full border-zinc-900" /> }
        </div>
    );
}

export default Done;
