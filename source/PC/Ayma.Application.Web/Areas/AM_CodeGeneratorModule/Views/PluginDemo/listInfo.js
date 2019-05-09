var pluginList = [{
    id: '0',
    text: '框架自带',
    value: 'no',
    hasChildren: true,
    isexpand: true,
    complete: true,
    ChildNodes: [
        {
            id: 'aymatree',
            text: '树形插件',
            value: 'aymatree',
            isexpand: false,
            complete: true
        },
         {
             id: 'aymaselect',
             text: '选择框',
             value: 'aymaselect',
             isexpand: false,
             complete: true
         },
          {
              id: 'aymauserselect',
              text: '人员选择框',
              value: 'aymauserselect',
              isexpand: false,
              complete: true
          }
    ]
}, {
    id: '1',
    text: '第三方集成',
    value: 'no',
    hasChildren: true,
    isexpand: true,
    complete: true,
    ChildNodes: [
         {
             id: 'jfGrid',
             text: '表格(JFGrid)',
             value: 'jfGrid',
             isexpand: false,
             complete: true
         },
         {
             id: 'webUploader',
             text: '上传文件(WebUploader)',
             value: 'webUploader',
             isexpand: false,
             complete: true
         }
    ]
}];