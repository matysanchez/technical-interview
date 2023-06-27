"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { Job } from './components/job/index'
import { BsFillFastForwardCircleFill } from 'react-icons/bs';
import { IJob } from './components/job/job.interface'
import axios from 'axios';
import { useEffect, useState } from 'react';

type findJobs = {
  page?: number;
  latitude?: number;
  longitude?: number;
  distance?: number;
  text?: string;
}

type jobsResult = {
  list: IJob[];
  count: number;
}

export default () => {

  const [searchText, setSearchText] = useState('');
  const [jobs, setJobs] = useState<jobsResult>();
  const [currentPage, setCurrentPage] = useState(0);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [distance, setDistance] = useState(0);


  async function getJobs(findBy?: findJobs) {
    const { data } = await axios.post(`http://localhost:8000/jobs/find`, findBy);
    setJobs(data)
  }



  const findJobsByTitle = (text: string) => {
    setSearchText(text)
    if (text.length > 2) {
      getJobs({ text: text });
    } else {
      getJobs();
    }
    setCurrentPage(0)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        // distance in meters
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
        setDistance(500000)
        getJobs({ latitude: location.coords.latitude, longitude: location.coords.longitude, distance: 5000000 })
      },
        (location) => {
          alert('User denied Geolocation')
          getJobs()
        },
      )
    } else {
      // I believe it may also mean geolocation isn't supported
      getJobs()
    }

  }, [])
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.header_container}>
          <div className={styles.header_img_container}>
            <Image src="/assets/logo.png" width={284} height={74} alt="Logo" />
          </div>
          <div className={styles.header_menu_container}>
            <ul className={styles.header_ul_container}>
              <li><a href='#'>Why SkillUp?</a></li>
              <li className={styles.dropdown} >
                <a href='#'>Menu <Image src="/assets/angle-down.svg" width={15} height={9} alt="Picture of the author" className={styles.header_img_dropdow} /></a>
                <ul className={styles.header_ul_dropdow}>
                  <li><a href='#'>About Us</a></li>
                  <li><a href='#'>About Us</a></li>
                  <li><a href='#'>About Us</a></li>
                </ul>
              </li>
              <li><a href='#'><Image src="/assets/location.svg" width={27} height={37} alt="Picture of the author" /> Dallas</a></li>
              <li><a href='#'><BsFillFastForwardCircleFill size={36} color='#FF6A69' /> My Path</a></li>
              <li><a href='#'><Image src="/assets/heart.svg" width={24} height={20} alt="Picture of the author" /> Leah</a></li>
            </ul>
          </div>
        </div>
      </header >

      <section className={styles.page_body}>
        <h2 className={styles.page_body_h2}> We locate promising jobs that provide educational perks. Keep coming back for new additions!</h2>
        <div className={styles.page_body_search_bar} >
          <label className={styles.page_body_search_results} >
            Showing {jobs?.count} results.
            <label className={styles.page_body_search_how} >
              How did we choose these open jobs?
            </label>
          </label>
          {/* <div className={styles.page_body_search_box}> */}
          <input type='text' placeholder='Keyword' className={styles.page_body_search_box} value={searchText} onChange={(e) => findJobsByTitle(e.target.value)} />
          {/* </div> */}
        </div>
        {/* jobs area */}
        <div>
          {jobs?.list?.map((job: IJob) => <Job key={job._id} job={job} />)}
        </div>
      </section>

      {!!jobs?.count && jobs?.count > 10 &&
        <div className={styles.paginator}>
          {Array.from(Array(Math.ceil(jobs?.count / 10)).keys()).map((page) => <label
            className={currentPage === page ? styles.active : styles.inactive}
            onClick={() => { getJobs({ page: page, text: searchText, latitude, longitude, distance }); setCurrentPage(page) }}
            key={page}>{page + 1}</label>)}
        </div>
      }

    </main>
  )
}
