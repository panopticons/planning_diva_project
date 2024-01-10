import styles from '../app/page.module.css'
import MiniMenu from '@/components/mini_menu'

export default function Home() {
  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <MiniMenu>MiniMenu</MiniMenu>
      </div>
    </main>
  )
}
