import TradingviewWidget from '@/components/shared/tradingview-widget'
import WatchlistButton from '@/components/shared/watchlist-button'
import {
	BASELINE_WIDGET_CONFIG,
	CANDLE_CHART_WIDGET_CONFIG,
	COMPANY_FINANCIALS_WIDGET_CONFIG,
	COMPANY_PROFILE_WIDGET_CONFIG,
	SYMBOL_INFO_WIDGET_CONFIG,
	TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from '@/constants'

export default async function StockDetails({ params }: StockDetailsPageProps) {
	const { symbol } = await params
	const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`

	return (
		<div className='flex min-h-screen p-4 md:p-6 lg:p-8'>
			<section className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
				{/* Left column */}

				<div className='flex flex-col gap-6'>
					<TradingviewWidget
						scriptUrl={`${scriptUrl}symbol-info.js`}
						config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
						height={170}
					/>

					<TradingviewWidget
						scriptUrl={`${scriptUrl}advanced-chart.js`}
						config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
						className='custom-chart'
						height={600}
					/>

					<TradingviewWidget
						scriptUrl={`${scriptUrl}advanced-chart.js`}
						config={BASELINE_WIDGET_CONFIG(symbol)}
						className='custom-chart'
						height={600}
					/>
				</div>

				{/* Right column */}
				<div className='flex flex-col gap-6'>
					<div className='flex items-center justify-between'>
						<WatchlistButton
							symbol={symbol.toUpperCase()}
							company={symbol.toUpperCase()}
							isInWatchlist={false}
						/>
					</div>

					<TradingviewWidget
						scriptUrl={`${scriptUrl}technical-analysis.js`}
						config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
						height={400}
					/>

					<TradingviewWidget
						scriptUrl={`${scriptUrl}symbol-profile.js`}
						config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
						height={440}
					/>

					<TradingviewWidget
						scriptUrl={`${scriptUrl}financials.js`}
						config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
						height={600}
					/>
				</div>
			</section>
		</div>
	)
}
