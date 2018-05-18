$(function(){

    var summa = 500;

    $( ".scroller" ).slider({
        animate: "fast",
        min: 500,
        max: 50000,
        step: 1,
        value: summa,
        slide: scroller,
        change: scroller,
        stop: scroller
    });

    $('.ui-slider-handle').eq(0).append('<ins>'+summa+'$</ins>');
    $('[name="summa"]').val(summa);

    $('[name="summa"]').bind('change', function(event, ui){
        if ($(this).val().match(/[^0-9()\-\+]/g)) {
            $(this).val($(this).val().replace(/[^0-9()\-\+]/g,''));
        }
        // $slider.slider('value', $(this).val());
        $( ".scroller" ).slider('value', $(this).val());
    }).change();

    $('[name="reinvest"]').bind('change', function(event, ui){
        $(this).parents('tr').find('.nedela_reinvest').removeAttr('checked');
        $(this).parents('tr').find('.viplata').removeAttr('checked');
        $('[name="summa"]').change();
    });

    $('.nedela_reinvest').bind('change', function(event, ui){
        $(this).parents('tr').find('.viplata').removeAttr('checked');
        $('[name="summa"]').change();
    });

    $('.viplata').bind('change', function(event, ui){
        $(this).parents('tr').find('.nedela_reinvest').removeAttr('checked');
        $('[name="summa"]').change();
    });

});

function scroller(event, ui){
    //ОБЪЯВИЛИ ВСЕ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
    var vklad = ui.value;

    var den = vklad/100;

    var nedela = vklad/100*7;

    var dostupno = 0;

    var viplata = 0;

    //ЗАЛОЖИЛИ ВСЕ ЗНЧЕНИЯ В КОНТЕЙНЕРЫ
    $('.ui-slider-handle').eq(0).find('ins').text(ui.value+'$');
    $('[name="summa"]').val(ui.value);
    $('.vden').text(den.toFixed(2));
    $('.vnedelu').text(nedela.toFixed(2));

    //ПО СТРОКАМ 
    $('.prib_row').each(function(){
        var totalNedela = 0;
        var pribilNedela = 0;

        //ПО СТОЛБЦАМ ДНЕЙ
        $('.prib_td', this).each(function(){

            $('.prib_vden', this).text(den.toFixed(2)+'$').attr('alt', den.toFixed(2));

            totalNedela = Number(totalNedela.toFixed(2)) + Number($(this).find('.prib_vden').attr('alt'));

            $('.cur_nedela', this).text(totalNedela.toFixed(2)+'$').attr('alt', totalNedela.toFixed(2));
            
            if($(this).find('[name="reinvest"]').attr("checked") == 'checked'){
                vklad = Number(vklad.toFixed(2)) + Number(totalNedela.toFixed(2));

                totalNedela = Number(totalNedela.toFixed(2))-$('.cur_nedela', this).attr('alt');

                $('.cur_nedela', this).text(0.00).attr('alt', 0.00);
                den = vklad.toFixed(2)/100;

            }
        });

        //ЕСЛИ СТОИТ РЕИНВЕСТ ТО ДЕЛАЕМ РЕИНВЕСТ
        if($('.nedela_reinvest', this).attr('checked') == 'checked'){
            var nedelaReinvest = $('.prib_dostupno', this).attr('alt');
            vklad = Number(vklad.toFixed(2)) + Number(nedelaReinvest);
            den = vklad.toFixed(2)/100;
            totalNedela = 0;
        }

        //ЕСЛИ СТОИТ ВЫПЛАТА
        // if($('.viplata', this).attr('checked') == 'checked'){
        //     viplata = Number(viplata.toFixed(2)) + Number($('.prib_dostupno', this).attr('alt'));
        //     $('.summa_viplati', this).text(viplata.toFixed(2)+'$').attr('alt', viplata.toFixed(2));
        //     $('.summa_pribili', this).text(viplata.toFixed(2)+'$').attr('alt', viplata.toFixed(2));
        //     totalNedela = 0;
        // }
        // else{
        //     $('.summa_viplati', this).text(0.00+'$').attr('alt', 0.00);
        // }

        //СУММА ВКЛАДА В КОНЦЕ СТРОКИ
        $('.summa_vklada', this).text(vklad.toFixed(2)+'$').attr('alt', vklad.toFixed(2));

        //ПРИБЫЛЬ ЗА НЕДЕЛЮ
        $('.prib_td', this).each(function(){
            pribilNedela = Number(pribilNedela.toFixed(2)) + Number($('.prib_vden', this).attr('alt'));
        });
        $('.prib_nedela', this).text(pribilNedela.toFixed(2)+'$').attr('alt', pribilNedela.toFixed(2));


        // nedela = Number(nedela) + Number($('.prib_nedela').attr('alt'));

        dostupno = Number(dostupno.toFixed(2))+Number(totalNedela.toFixed(2));
        $('.prib_dostupno', this).text(dostupno.toFixed(2)+'$').attr('alt', dostupno.toFixed(2));

    });

}












