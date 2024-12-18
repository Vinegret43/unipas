# Высокоуровневые языки программирования

<img 
    class="universal"
    src="/artwork/cs-101/under-construction.jpg"
    alt='Эта статься ещё в разработке. Читайте на свой страх и риск'
/>

<!-- TODO: Иллюстрация: Покупайте лень. Продам за бесценок -->

## Зачем они нужны?
Язык ассемблера - хорошая вещь. По крайне мере, если тебе надо написать что-нибудь не слишком сложное.
Однако, когда в программе много инструкций, запутаться в них проще простого.
Да и с памятью приходится работать вручную. А ещё необходимо учитывать особенности процессора и ОС,
под которые ты пишешь программу. Создавать реально сложные программы на языке
ассемблера можно, но это боль. На потакание процессору и операционной системе уходит
больше сил и времени, чем на написание логики самой программы. 

Мы уже абстрагировались от процессорных инструкций с помощью языка ассемблера. И от языка
ассемблера тоже абстрагируемся. Лучше один раз напрячься и создать инструмент, который
облегчит тебе работу в будущем, чем страдать, делая всё вручную.
То же самое можно сказать при помощи фразы "Лень - двигатель прогресса".

Программисты - люди ленивые, поэтому давным давно они хорошенько напряглись и создали высокоуровневые
языки программирования. Их суть вот в чём: ты описываешь свою программу при помощи особого
"высокоуровневого" языка, представляющего из себя смесь человеческого языка, а также языка
математики и логики. После этого специальная программа под названием "компилятор" переводит
эту запись на язык ассемблера, либо напрямую в процессорные инструкции.

<!-- 
TODO: Привести аналогию, чтобы описать различия между высокоуровнемыми языками и ассемблером.
Рассказать о том, компиляция - это необратимый процесс.
-->

Ещё один плюс высокоуровневых языков в том, что программы, написанные не них, как правило,
полностью отвязаны от конкретного процессора или операционной системы. Программисту достаточно
написать программу один раз, а адаптировать её под различные платформы будет сам компилятор.

## Основы (Почти) любого языка программирования
Давайте не пытаться изучать язык(синтаксиc) ассемблера с нуля, а поймём, что же он делает на "простых" примерах.
Потому что именно ради умения прочитать ассемблер, его и изучают в современных условиях.

### Переменные и типы данных
<!-- какая-то подводка -->
Как же работают переменные в языках высокого уровня и в ассемблере?

C++

```cpp
#include <iostream> // Подключаем библиотеку для ввода/вывода
int main() {
    // Объявляем и инициализируем переменные
    int num1 = 5; // Первая переменная
    int num2 = 10; // Вторая переменная
    int result;    // Переменная для хранения результата
    // Сложение
    result = num1 + num2; // Складываем num1 и num2, записываем в result
    // Вывод результата
    std::cout << "Результат: " << result << std::endl; // Выводим результат на экран
    return 0; // Завершаем программу
}
```

TASM

```asm
.MODEL SMALL                  ; Указывает на использование малой модели памяти. В этой модели сегменты кода и данных помещаются в пределах 64 КБ.
.STACK 100h                   ; Определяет размер стека(здесь храняться временные данные), равный 256 байтам (100h в шестнадцатеричном).
.DATA                         ; Начало секции данных, где объявляются переменные.
    num1 DB 5                 ; Define Byte Объявляет переменную num1 типа Byte (1 байт) и инициализирует её значением 5.
    num2 DB 10                ; Define Byte Объявляет переменную num2 типа Byte (1 байт) и инициализирует её значением 10.
    result DB ?               ; Define Byte Объявляет переменную result типа Byte (1 байт) без инициализации (будет хранить результат).
    message DB 'Результат: $' ; Объявляет строку, которую будем выводить. Символ $ указывает на конец строки.
.CODE                         ; Начало секции кода, где располагается исполняемая часть программы.
MAIN PROC                     ; Объявляет начало процедуры MAIN.
    MOV AX, @DATA             ; Загружает адрес сегмента данных в регистр AX.
    MOV DS, AX                ; Перемещает значение из AX в регистр DS, тем самым инициализируя сегмент данных.
    ; Сложение
    MOV AL, num1              ; Загружает(перемещает) значение переменной num1 в регистр AL(это младший байт общего регистра AX).
    ADD AL, num2              ; Добавляет значение переменной num2 к содержимому регистра AL. Теперь AL содержит 15.
    MOV result, AL            ; Сохраняет(перемещает) значение, находящееся в AL (15), в переменной result.
    ; Выводим сообщение
    MOV DX, OFFSET message    ; OFFSET возвращает адрес переменной message. MOV Загружает адрес строки message в регистр DX.
    MOV AH, 09h               ; Функция прерывания 09h, которая указывает на то, что мы собираемся вывести строку на экран.
    INT 21h                   ; Вызов прерывания DOSа, которое выполняет вывод строки в DX на экран.
    ; Выводим результат
    MOV AL, result            ; Загружает значение result в AL
    ADD AL, 30h               ; Преобразуем число в ASCII-код (например, 0 -> '0')
    MOV DL, AL                ; Перемещаем в DL для вывода
    MOV AH, 02h               ; Функция 02h для вывода символа
    INT 21h                   ; Вызов прерывания DOSа, которое выполняет вывод строки в DX на экран.
    ; Завершение программы
    MOV AX, 4C00h             ; Подготавливает завершение программы. Код 4C в AX используется для завершения подпрограммы.
    INT 21h                   ; Вызывает прерывание 21h, чтобы DOS завершил выполнение программы.
MAIN ENDP                     ; Объявляет конец процедуры MAIN.
END MAIN                      ; Указывает, что программа заканчивается.
```

То есть для объявления переменной в ассемблере мы сами должны указывать нужный регистр процессора,
в то время как в высоких языках компилятор сам думает об этой задаче.

### Условия и циклы

Теперь сразу перейдём к части ветвления и цикла:

C++

```cpp
long long sum = 0; // Используем long long для большей точности
  for (long long i = 1; i <= 10; ++i) {
    sum += i;
  }
```

NASM

```asm
_start:
    mov rax, 0      ; инициализируем сумму (rax - 64-битный регистр)
    mov rcx, 1      ; инициализируем счетчик (rcx - 64-битный регистр)

loop_start:
    cmp rcx, [counter] ; сравниваем счетчик с 10
    jg loop_end       ; если rcx > 10, переходим к концу цикла

    add rax, rcx      ; прибавляем значение счетчика к сумме
    inc rcx          ; увеличиваем счетчик

    jmp loop_start   ; переходим к началу цикла

loop_end:
    mov [sum], rax  ; сохраняем сумму в памяти
```

Можно заметить, что главным отличием этих программ будет наличие у ассемблера jg и jmp.
jg - Условный переход (jump if greater): переходит, если первый операнд больше второго. 
jmp - продолжаем ходить по кругу.

### Функции и процедуры

Думаю вы уже утомились читать, а я писать, поэтому ускоряемся!
Разнообразим эту статью, напишем код на PASCAL

```delphi
//обЪявляем процедуру
procedure ProcedureName(ParameterType ParameterName; Parameter2Type Parameter2Name);
<тело>
end;
//обЪявляем функцию
function functionName(ParameterType ParameterName; Parameter2Type Parameter2Name) : functionType;
<тело>
result:=<result>; или functionName:=<result>;

//Вызов
ProcedureName(ParameterName,Parameter2Name);
f:=functionName(ParameterName,Parameter2Name);
```

Ассемблер(NASM)

```asm
;описание
my_procedure:
    ;Передача параметров (параметров как таковых нет,используются регистры)
    mov eax, edi  ;
    ; Код процедуры
    ret      ;В конце процедуры используется директива ret для возврата из процедуры.

;Вызов
call my_procedure
```

Функции как вид отсутствуют, просто в конце выполнения они передают значение в нужный регист

### Объекты и ООП

Думаю мало кто из вас видел объекты ранее, поэтому будет полная программа на PASCAL:

```delphi
program ObjectExample;
//Создаётся объект в type
//определяются его поля и методы
type 
    TMyObject = object
        Field1: Integer;

        procedure SetField(Value: Integer);
    end;
        function GetField: Integer;
    end;

procedure TMyObject.SetField(Value: Integer);
begin
    Field1 := Value; // Устанавливаем значение поля
end;

function TMyObject.GetField: Integer;
begin
    Result := Field1; // Возвращаем значение поля
end;

var
    MyObj: TMyObject;

begin
    MyObj.SetField(42); // Устанавливаем значение поля
    WriteLn('Field1 value: ', MyObj.GetField); //выводим значение поля
end.
```

Увы, но ассемблер не поддерживает объекты в том же смысле, что и высокоуровневые языки,
можно использовать структуры и процедуры для реализации концепций, подобных объектам.
А вот как это выглядит:

NASM

```asm
section .data                    ; Выделяет память. Секция данных, где находятся статически выделенные переменные, которые будут инициализированы.
    myObjectInstance MyObject <> ; Создание экземпляра структуры. <> указывает, что структура создается без инициализации полей.
    msg db 'Field1 value: ', 0   ; Сообщение для вывода. 0 - завершение строки
    msg_len equ $ - msg          ; Длина сообщения

section .bss                     ; Секция BSS (Block Starting Symbol) для хранения неинициализированных данных.
    buffer resb 10               ; Буфер для хранения строки
section .text                    ; Секция, где находятся исполняемые инструкции.
    global _start                ; global - значит можно смотреть всем.

    MyObject struct
        Field1 dd ?       ; (define doubleword)  Поле 1: 32-битное значение, которое пока не инициализировано
        Field2 dd ?       ; (define doubleword)  Поле 1: 32-битное значение, которое пока не инициализировано
    MyObject ends
                          ;struct...end Определение структуры MyObject.
    ; Метод для установки значения поля Field1
    SetField1:              ; Начало функции.
        mov eax, [esp + 4]  ; Извлечение указателя на объект (экземпляр структуры) из стека. Это значение передается в качестве аргумента функции.
        mov [eax], ebx      ; Значение ebx сохраняется по адресу, на который указывает eax
        ret                 ; Конец функции.

    ; Метод для получения значения поля Field1
    GetField1:              ; Начало функции.
        mov eax, [esp + 4]  ; Извлечение указателя на объект (экземпляр структуры) из стека. Это значение передается в качестве аргумента функции.
        mov eax, [eax]      ; Получение значения Field1 и сохранение его в eax
        ret                 ; Конец функции.

    _start:                 ; Начинается выполнение программы.
        ; Установка значения Field1
        mov ebx, 42         ; Установка значения 42 в регистр ebx.
        lea eax, [myObjectInstance] ; Загрузка адреса экземпляра в регистр eax (Подобно MOV eax, offset [myObjectInstance]).
        call SetField1      ; Вызов метода(функции)

        ; Получение значения Field1
        lea eax, [myObjectInstance] ; Загрузка адреса экземпляра.
        call GetField1              ; Вызов метода(функции)
        // ну очень длинный вывод сообщения
        ;int->str
        mov ecx, 10                ; Основание
        mov edi, buffer + 10       ; Указатель на конец буфера
        mov byte [edi], 0          ; Завершение строки
        //
        dec edi                    ; Двигаем указатель влево
        xor edx, edx               ; Очищаем EDX перед делением
        div ecx                    ; EAX / 10, остаток в EDX
        add dl, '0'                ; Преобразование в символ
        mov [edi], dl              ; Сохраняем символ
        test eax, eax               ; Проверяем, достигли ли нуля
        jnz .convert                ; Если нет, продолжаем

        mov edx, edi               ; Указатель на начало строки
        ; Вывод строки
        mov eax, 4                 ; syscall: write
        mov ebx, 1                 ; файл: stdout
        mov ecx, msg               ; сообщение
        mov edx, msg_len           ; длина сообщения
        int 0x80                   ; Вызов программного прерывания для выполнения системного вызова

        ; Вывод числа
        mov eax, 4                 ; syscall: write
        mov ebx, 1                 ; файл: stdout
        mov ecx, buffer            ; буфер с числом
        mov edx, 10                ; максимальная длина строки
        int 0x80                   ; Вызов программного прерывания для выполнения системного вызова
        ; Завершение программы
        mov eax, 1          ; Подготовка для вызова системного вызова exit: устанавливаем код завершения программы в регистр eax.
        xor ebx, ebx        ; Установка кода возврата программы в 0, что указывает на успешное завершение.
        int 0x80            ; Вызов программного прерывания для выполнения системного вызова, который завершает программу.
```

<!-- мем с мозгом, когда прочитал описания КАЖДОЙ **** строчки -->
<!--
### Библиотеки и юниты

 TODO -->
Подведём итоги нашего сравнения ассемблеров с высокоуровневыми языками! 
Что же мы узнали?
Во-первых, всё зависит от того какой ассемблер мы используем.
Во-вторых, сделать вывод в языке высокого уровня - дело одной строчки, когда в ассемблере тебе нужен десяток.
В-третьих, все переменные и не только надо вручную записывать в регистры.
Наконец, мы нашли множество сходств (как минимум я).

<!--
Это старая версия. Интерпретаторы упоминать вообще не нужно. 

## Что и зачем?
Программировать на ассемблере реально, но очень сложно и трудоёмко. Программисты - люди ленивые, им
вообще не хочется иметь дело с Бобом. Хочется общаться с компьютером на человеческом языке.
Для удовлетворения этой самой хотелки и были созданы высокоуровневые языки программирования.
По факту большинство языков скорее заимствуют всё из языка математики, а не из человеческого языка,
однако даже математический язык намного более понятен человеку, чем язык ассемблера.

Ещё один плюс высокоуровневых языков в том, что код, написанный на них, как правило, не привязан
к конкретной процессорной архитектуре или операционной системе. А это значит, что программу
достаточно написать всего лишь один раз, а её адаптацией под различные платформы будет
заниматься компилятор.

Команды, написанные на каком-то языке программирования, ещё надо перевести на понятный
процессору язык. Есть много разных способов сделать это. Каждый инструмент, выполняющий
подобную задачу, по-своему уникален, однако для простоты их делят на две категории:
1. Компиляторы. Они берут написанный человеком текст, *целиком* преобразовывают его в
набор инструкций для процессора и сохраняют их в файл для дальнейшего использования.
2. Интерпретаторы. Они преобразовывают написанный человеком код в инструкции по маленьким частям.
Чаще всего - по одной строчке. И, чаще всего, не сохраняют эти инструкции в файл, а сразу же
отправляют их процессору на исполнение.

Некоторые компиляторы преобразовывают код в инструкции для процессора напрямую. Некоторые
генерируют мнемоническую запись этих самых инструкций на языке ассемблера, а потом
отправляют ассемблеру, чтобы тот преобразовал их в инструкции. Это целиком и
полностью зависит от внутреннего устройства компилятора.

Компилятор, сам по себе, не выдаёт готовый исполняемый файл. Он производит так называемый
"объектный файл" - инструкции для процессора, в которых ещё не разрешены ссылки
на библиотечные функции. Чтобы разрешить их, объектный файл (Или сразу несколько
зависящих друг от друга объектных файлов) надо пропустить через компановщик.
Компановщик соберёт все эти файлы в единый исполняемый файл, а также разрешит
ссылки на  -->
