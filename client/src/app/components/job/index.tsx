import styles from './article.module.scss'
import Image from 'next/image'
import { FaDollarSign } from 'react-icons/fa'
import { IoIosPeople } from 'react-icons/io'
import { LiaDoorOpenSolid } from 'react-icons/lia'
import { IJob } from './job.interface'

export function Job({ job }: { job: IJob }) {
    return (
        <div className={styles.article}>
            <div className={styles.container} >
                <div className={styles.rigth_area} >
                    <div className={styles.logo_title} >
                        <div className={styles.image_container} >
                            <img src="/assets/download.png" alt="Logo" />
                        </div>
                        <div className={styles.description}>
                            <h2>{job.title_raw ? job.title_raw : job.title_name} </h2>
                            <div className={styles.location}>
                                <label>at {job.company_name}</label>
                                <Image src="/assets/dot-location.svg" width={13} height={18} alt="Location" />
                                <label>{job.city_name}</label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.riasec}>
                        {job?.riasec && job.riasec.map((item, index) => <div className={styles.riasec_button} key={index}>
                            <IoIosPeople color='#013145' size={24} />
                            <label>{item}</label>
                        </div>)
                        }
                    </div>
                </div>

                {/* right area */}
                <div className={styles.buttons_area}>
                    <div className={styles.like}>
                        <Image src="/assets/heart.svg" width={28} height={23} alt="Like" />
                    </div>
                    <div className={styles.job_button}>
                        
                        {job.is_earn_and_learn ?
                            <>
                            <span className="tooltiptext">Earn & Learn lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                            <FaDollarSign color='#013145' /><label>Earn & Learn</label></>
                            :
                            <><LiaDoorOpenSolid color='#013145' /><label>Gateway Job</label></>
                        }
                    </div>
                    <div className={styles.job_salary}>
                        ${job.max_salary.toLocaleString()}/year
                    </div>
                </div>
            </div>
            <div className={styles.footer} >
                <h4>Skills</h4>
                <p>{job.skills_name.map((item: any, index) => item.value).join(', ')}
                </p>
            </div>
        </div>
    )

}