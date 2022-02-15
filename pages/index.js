import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

// export const getServerSideProps = async () => {
//   return await {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://dario:MtJTi%40nPXM26_9%23@cluster0.cywid.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
};

export default HomePage;
