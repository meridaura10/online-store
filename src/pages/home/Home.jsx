import React from 'react'
import Main from '../../components/main/Main'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Home.module.scss'
function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Main />
    </div>
  )
}

export default Home