import PoolsPrediction from '../components/Predictions/Pools'
import PredictionMainComp from '../components/Predictions/PredictionMainComp'
import ThisWeekExtra from '../components/Predictions/ThisWeekExtra'

function PredictionScreen() {

  return (
    <section className=" w-full  justify-center items-center p-4 "  >
      <div className=" justify-center gap-y-6 py-4 sm:px-0 px-36 items-center sm:items-start pt-10 ">
        <PoolsPrediction />
        <ThisWeekExtra />
        <PredictionMainComp />

      </div>

    </section>
  )
}

export default PredictionScreen  