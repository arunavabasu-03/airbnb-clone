import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Infocard from "../components/Infocard";

export default function Search({ serachResults }) {


  //insilize router
  const router = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");

  console.log(formattedStartDate);
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate}-${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} Guests`} />
      <main className="flex ">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays -{range}- {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {" "}
            Stays in {location}
          </h1>

          <div
            className="hidden lg:inline-flex mb-5 space-x-3
          text-gray-800 whitespace-nowrap"
          >
            <p className=" button">Cancellation Flexibility</p>
            <p className=" button">Type of place</p>
            <p className=" button">Price</p>
            <p className=" button">Rooms and Beds</p>
            <p className=" button">More filters</p>
          </div>

          {/* searchresults div */}
          <div className="flex flex-col">
          {serachResults.map(
            ({ img, location, title, description, star, price, total }) => (
              <Infocard
                key={img}
                img={img}
                loctiona={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total}
              />
            )
          )}
          </div>
          
        </section>
      </main>
      <Footer />
    </div>
  );
}

//implementing ssr

export async function getServerSideProps() {
  const serchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      serchResults,
    },
  };
}