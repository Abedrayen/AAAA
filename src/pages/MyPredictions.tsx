// MyPredictionsScreen component
import MyPredictionsMain from '../components/myPredictions/MyPredictionsMainComponent';
function MyPredictionsScreen() {


  return (
    <div className="overflow-x-auto flex flex-col justify-center ">
      {/* This div is the container; check its styles */}
        <MyPredictionsMain />
    </div>
  );
}

export default MyPredictionsScreen;
