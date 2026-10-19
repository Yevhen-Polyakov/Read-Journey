import type { BookProgress } from '@/types/books'
import Icon from '../Icon/Icon'
import css from './Statistics.module.css'

type Props = {
    totalPages: number;
    progress: BookProgress[];
}

const Statistics = ({ totalPages, progress }: Props) => {
    const readPages = progress.reduce((sum, item) => {
        const pages = item.finishPage - item.startPage
        return item.status === 'active' || pages <= 0 ? sum : sum + pages
    }, 0)

    const safeTotal = Math.max(totalPages, 1)
    const percent = Math.min(100, (readPages / safeTotal) * 100)

    return (
        <div className={css.static}>

            <div className={css.headerText}>
                <h3 className={css.title}>Statistics</h3>
                <div className={css.process}>
                    <Icon variant='hours'/>
                    <Icon variant='pieChart'/>
                </div>
            </div>

                <p className={css.paragraph}>Each page, each chapter is a new round of knowledge, a new step towards understanding. By rewriting statistics, we create our own reading history.</p>
        
            <div className={css.wrap}>
                <div
                    className={css.chart}
                    role="img"
                    aria-label={`Read ${readPages} of ${totalPages} pages, ${percent.toFixed(2)}%`}>
                    <Icon
                        className={css.svg}
                        variant="chart"
                        style={{ '--chart-offset': 100 - percent } as React.CSSProperties}
                    />
                    <span className={css.percent}>{percent.toFixed(percent % 1 === 0 ? 0 : 2)}%</span>
                </div>

                <div className={css.legend}>
                    <span className={css.dot} aria-hidden="true" />

                    <div className={css.progress}>
                        <span className={css.value}>{percent.toFixed(percent % 1 === 0 ? 0 : 2)}%</span>
                        <span className={css.text}>{readPages} pages read</span>
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default Statistics
