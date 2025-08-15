"use client"

import { useState, useCallback, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Slider } from "@/ui/slider"

export const WeightRangeFilter = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [values, setValues] = useState<[number, number]>(() => {
        const minWeight = searchParams.get('min_weight')
        const maxWeight = searchParams.get('max_weight')

        return [
            minWeight ? parseInt(minWeight, 10) : 0,
            maxWeight ? parseInt(maxWeight, 10) : 100
        ]
    })

    const updateURL = useCallback((newValues: [number, number]) => {
        const params = new URLSearchParams(searchParams.toString())

        if (newValues[0] > 0) {
            params.set('min_weight', newValues[0].toString())
        } else {
            params.delete('min_weight')
        }

        if (newValues[1] < 100) {
            params.set('max_weight', newValues[1].toString())
        } else {
            params.delete('max_weight')
        }

        params.delete('page')

        const newURL = `${pathname}?${params.toString()}`
        router.push(newURL, { scroll: false })
    }, [searchParams, pathname, router])

    const handleValueCommit = (newValues: number[]) => {
        const weightRange: [number, number] = [newValues[0], newValues[1]]
        setValues(weightRange)
        updateURL(weightRange)
    }

    useEffect(() => {
        const minWeight = searchParams.get('min_weight')
        const maxWeight = searchParams.get('max_weight')

        const urlValues: [number, number] = [
            minWeight ? parseInt(minWeight, 10) : 0,
            maxWeight ? parseInt(maxWeight, 10) : 100
        ]

        if (urlValues[0] !== values[0] || urlValues[1] !== values[1]) {
            setValues(urlValues)
        }
    }, [searchParams, values])

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <div className="text-xs text-caption">
                    <span>{values[1]}</span>
                    <span className="mr-1">کیلوگرم</span>
                </div>
                <div className="text-xs text-caption">
                    <span>{values[0]}</span>
                    <span className="mr-1">کیلوگرم</span>
                </div>
            </div>
            <Slider
                defaultValue={values}
                min={0}
                max={100}
                onValueCommit={handleValueCommit}
            />
        </div>
    )
}