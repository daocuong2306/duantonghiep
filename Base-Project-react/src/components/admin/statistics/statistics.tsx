
import ChartOne from './component/ChartOne'

import TableThree from './component/TableThree'
import { DemoPie } from './component/Card2'
import { DemoColumn } from './component/Card3'

type Props = {}

const Statistics = (props: Props) => {
    return (
        <>

            <div >
                <ChartOne />
            </div>

           
            <div>
                <DemoPie />
            </div>
            
        </>
    )
}

export default Statistics