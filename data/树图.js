{
    series: [
        {
            name: '树图',
            type: 'tree',
            orient: 'vertical',  // vertical horizontal
            rootLocation: {left: '50%'}, // 根节点位置  {x: 100, y: 'center'}
            nodePadding: 8,
            layerPadding: 200,
            hoverable: false,
            roam: true,
            symbolSize: 16,
            itemStyle: {
                normal: {
                    color: '#4883b4',
                    label: {
                        show: true,
                        position: 'right',
                        formatter: "{b}",
                        textStyle: {
                            color: '#000',
                            fontSize: 16
                        }
                    },
                    lineStyle: {
                        color: '#ccc',
                        type: 'solid' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                    }
                },
                emphasis: {
                    color: '#4883b4',
                    label: {
                        show: false
                    },
                    borderWidth: 0
                }
            },
            data: [
                {"name": "张三", "id": "123", "children":
                    [
                        {"id": "12","name": "李四","children":[
                            {"id": "12","name": "王武"},
                            {"id": "12","name": "王武"}
                        ]},
                        {"id": "12","name": "王武"}
                    ]
                }
            ]
        }
    ]
};