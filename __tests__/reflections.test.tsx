import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'


describe(
    'page',
    () => {
        it(
        'renders',
        async () => {
            const { default: page } = await import('@/app/reflections/page')
            render(page({}))
            expect(screen.getByText('Add new reflection')).toBeInTheDocument()
        }
        )
    }
)

