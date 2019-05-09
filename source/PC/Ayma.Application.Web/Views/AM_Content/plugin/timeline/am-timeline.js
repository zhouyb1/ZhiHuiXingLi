/*
 * 创建人：前端开发组
 * 日 期：2017.03.22
 * 描 述：时间轴方法（降序）
 */
$.fn.timeline = function (nodelist) {

    // title   标题
    // people  审核人
    // content 内容
    // time    时间

    var $self = $(this);
    if ($self.length == 0) {
        return $self;
    }
    $self.addClass('am-timeline');
    var $wrap = $('<div class="am-timeline-allwrap"></div>');
    var $ul = $('<ul></ul>');

    // 开始节点
    var $begin = $('<li class="am-timeline-header"><div>当前</div></li>')
    $ul.append($begin);

    $.each(nodelist, function (_index, _item) {
        // 中间节点
        var $li = $('<li class="am-timeline-item" ><div class="am-timeline-wrap" ></div></li>');
        if (_index == 0) {
            $li.find('div').addClass('am-timeline-current');
        }
        var $itemwrap = $li.find('.am-timeline-wrap');
        var $itemcontent = $('<div class="am-timeline-content"><span class="arrow"></span></div>');
        $itemcontent.append('<div class="am-timeline-title">' + _item.title + '</div>');
        $itemcontent.append('<div class="am-timeline-body"><span>' + _item.people + '</span>' + _item.content + '</div>')
        $itemwrap.append('<span class="am-timeline-date">' + _item.time + '</span>');
        $itemwrap.append($itemcontent);
        $ul.append($li);
    });

    // 结束节点
    $ul.append('<li class="am-timeline-ender"><div>开始</div></li>');
    
    $wrap.html($ul);
    $self.html($wrap);

};