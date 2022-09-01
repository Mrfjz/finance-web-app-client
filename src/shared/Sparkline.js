import React from 'react'
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';


function SparkLine({ data }) {
    return (
        <Sparklines data={data || []} >
            <SparklinesLine style={{ fill: "none" }} />
            <SparklinesReferenceLine/>
            <SparklinesSpots size={2} />
        </Sparklines>
    )
}

export default SparkLine;