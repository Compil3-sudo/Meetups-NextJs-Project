import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useEffect, useState } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "first",
//     image:
//       "http://allpicts.in/wp-content/uploads/2018/03/Natural-Images-HD-1080p-Download-with-Keyhole-Arch-at-Pfeiffer-Beach.jpg",
//     address: "street 1",
//     description: "desc 1",
//   },
//   {
//     id: "m2",
//     title: "second",
//     image:
//       "https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg",
//     address: "street 2",
//     description: "desc 2",
//   },
//   {
//     id: "m3",
//     title: "third",
//     image:
//       "https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-wallpaper-27.jpg",
//     address: "street 3",
//     description: "desc 3",
//   },
// ];

const HomePage = (props) => {
  // THIS IS NOT IDEAL DO NOT USE.
  // INSTEAD USE getStaticProps

  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Active React Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// only use if you really need request and response Objects
// or if you have data that changes frequently
// // this alternative will regenerate for EVERY request
// // this means that you also have to wait after every request
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {props: {meetups: DUMMY_MEETUPS}}
// }

// THIS ONLY WORKS INSIDE COMPONENTS FROM THE PAGES FOLDER
export async function getStaticProps() {
  // this can load data before the component will render
  // fetch data from an API
  // always return an Object with props

  // this page will be generated every
  // x number of seconds set to revalidate
  // this ensures that date is never older than 1 seconds

  const client = await MongoClient.connect(
    "mongodb+srv://new_user_01:Meetupspassword@cluster0.z0ohbpq.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
