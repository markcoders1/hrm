import '../PagesCss/Home.css';
import '../components/Checkin/Checkin.css'
import Checkin from '../components/Checkin/Checkin';


const Check = () => {

  return (
    <div className='Home-container'>
      <div className="buttons">
       <Checkin/>
      </div>
    </div>
  );
};

export default Check;
