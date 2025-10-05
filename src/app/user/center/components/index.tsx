"use client";
import './index.css';
import React, {useEffect, useState} from "react";
import ReactECharts from 'echarts-for-react';
import {getUserSignInDayaUsingGet} from "@/api/userController";
import dayjs from "dayjs";

const SigninHeatmap: React.FC = () => {
    const [signinDays, setSignDays] = useState<number[]>([]);
    const fetchUserSignInData = async () => {
        try {
            // 获取用户签到数据
            const res = await getUserSignInDayaUsingGet({
                year: new Date().getFullYear(),
            });
            if (res && res.code === 0) {
                setSignDays(res.data);
            } else {
                throw new Error('获取用户签到数据失败！' + res.message);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        fetchUserSignInData();
    }, []);
    function getData(signinDays: number[], year: number) {
        const data = [];
        for (let day of signinDays) {
            data.push([dayjs(`${year}-01-01`).add(day, 'day').format('YYYY-MM-DD'), 1]);
        }
        return data;
    }

    console.log(getData(signinDays, 2025));
    const options = {
        title: {
            top: 0,
            left: 'center',
            text: '刷题日历热力图'
        },
        tooltip: {},
        visualMap: {
            show: false,
            min: 0,
            max: 1,
            inRange: {
                "color": ["#efefef", "lightgreen"],
            },
            type: 'piecewise',
            orient: 'horizontal',
        },
        calendar: {
            top: 60,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: '2025',
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: { show: false }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: getData(signinDays, 2025)
        }
    };

    return (
        <div id={"signin-heatmap"}>
            <ReactECharts option={options} />
        </div>
    )
};

export default SigninHeatmap;