import React, {useContext} from 'react';
import './App.css';
import Login from './Login';
import { UserContext } from './user-context';

function Home() {
  const {user} = useContext(UserContext);

  return (
    <main className="text-white pb-4">
      
      <section>
        <div className="text-center container pt-4">
          <picture>
            <img alt="" className="rounded img-fluid"
              src="https://images.footlocker.com/content/dam/final/eastbay/site/homepage/20191010-lebron17/20191010-Lebron17-Homepage-1UP.jpg" />
          </picture>
          <div className="text-center pt-2">
            <h2 className="">ALL HAIL THE KING</h2>
            <p>Rule the court like King James.</p>
            <div className="row">
              <div className="col">
                <a className="btn btn-outline-primary text-white mr-sm-2" href="#">SHOP MEN'S LEBRON 17 ></a>
                <a className="btn btn-outline-primary text-white" href="#">SHOP BOY'S LEBRON 17 ></a>
              </div>
            </div>
          </div>
        </div>
        <br />
      </section>

      <section>
        <div className="text-center container">
          <picture>
            <img alt="" className="img-fluid"
              src="https://images.footlocker.com/content/dam/final/eastbay/site/homepage/20191014-homepage-week37/2up-jordan.jpg" />
          </picture>

          <div className="text-center text-white">
            <h2 className="pt-2">JOIN THE #23 LEGACY</h2>
            <p>Gear up with the latest Jordan footwear and apparel.</p>
            <a className="btn btn-outline-primary text-white" href="#">SHOP JORDAN</a>
          </div>
        </div>
      </section>

    </main>
  );
}
export default Home;
