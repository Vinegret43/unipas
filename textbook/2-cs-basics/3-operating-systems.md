# Операционные системы

<img 
    class="universal"
    src="/artwork/cs-101/operating-system.png"
    alt='Морфеус из матрицы: "Нео, ты точно хочешь узнать, что такое операционная система?"'
/>

## Что такое операционная система?
Просто супер, теперь у нас есть универсальный работник по имени Боб, которого можно заставить
выполнять практически любую работу. Надо только написать последовательность инструкций
(компьютерную программу), объясняющую, как эту работу выполнять.

Просто ужас: нам надо выполнять сразу две программы одновременно, а Боб у нас только
один, и второго мы позволить не можем из-за долбанной инфляции. А ещё практически в каждой
программе, которую мы пишем, приходится реализовывать один и тот же функционал. Например,
работу с устройствами ввода/вывода: жёсткими дисками и SSD, сетевыми интерфейсами
и тому подобным.

Наша команда программистов долго думала над этими проблемами и наконец придумала: мы создадим
программу, которая будет, по сути, "виртуальным миром". Внутри неё будут жить все остальные программы.
В этот виртуальный мир будет встроена логика, заставляющая Боба регулярно переключаться
с выполнения одной программы на выполнение другой. Благодаря этому будет создаваться эффект, как будто
бы несколько программ выполняются одновременно. А ещё мы возьмём весь тот функционал, который
нужен абсолютно каждой программе, и встроим прямо в виртуальный мир, чтобы не дублировать
его каждый раз. А ещё мы устали писать машинный код вручную, поэтому мы разработаем
набор предустановленных программ и утилит для нашего мира, которые в будущем облегчат
разработку нового софта. Среди этих программ, как минимум, будут
ассемблер и текстовый редактор, чтобы мы могли программировать на языке ассемблера.

А, подождите-ка, вообще-то наши прогеры не придумали ничего нового. Такие
"виртуальные миры" уже существуют, их называют *операционными системами (ОС)*.

Любая операционная система состоит из *ядра* и набора предустановленных программ. Давным-давно
в этот набор входили только инструменты, облегчающие
работу программистам. Однако, когда компьютеры стали использоваться обычными, неподготовленными
людьми, набор программ начал меняться соответствующим образом. На сегодняшний день мы
имеем операционные системы, в которые из коробки входят графические оболочки, веб-браузеры и игры,
а какие-либо инструменты для разработки полностью отсутствуют за ненадобностью (Windows, например)

<img 
    class="universal"
    src="/artwork/cs-101/windows.jpg"
    alt='Мем, унижающий Windows 11'
/>

## Ядро и планировщик
*Ядро* операционной системы, по сути, описывает все законы этого "виртуального мира":
позволяет нескольким программам выполняться "одновременно", общаться друг с другом, а также
убирает нужду напрямую взаимодействовать с железом компьютера, потому что это крайне сложно. 

Часть ядра, регулирующая переключение Боба между выполнением различных программ, называется
"планировщик". Иногда может встречаться название "шедулер" ("scheduler") на английский манер. 

Переключение происходит следующим образом: у Боба есть таймер, с помощью которого
он отсчитывает, сколько времени осталось у программы на выполнение. Когда время заканчивается,
он сохраняет все числа, которые держал в голове, в память и "перепрыгивает" на инструкции
планировщика. Планировщик выбирает следующую программу на выполнение, после чего
Боб сбрасывает таймер и начинает выполнять её, пока время снова не истечёт.

## Драйверы
Напрямую работать с железом компьютера очень тяжело. Необходимо полностью разбираться, как
работает конкретное устройство, если ты хочешь с ним взаимодействовать. Всегда есть
куча подводных камней и нелогичных моментов, которые необходимо учитывать. А в некоторых
случаях устройство даже можно превратить в кирпич, если послать ему некорректные данные.
По этим причинам существуют *драйверы* - компоненты ядра, предоставляющие программам
упрощённый интерфейс для взаимодействия с различным железом компьютера. Достаточно сказать
драйверу, что тебе нужно от устройства, а всю работу по взаимодействию с устройством
он выполнит сам.

![Шуточная иллюстрация того, как работают драйверы](/artwork/cs-101/driver.png)

Чаще всего драйверы для железки пишут люди, создавшие саму железку. Правда иногда они
предоставляют драйверы всего для одной или двух операционных систем, забивая
на все остальные. В таких случаях добровольцам приходится изучать, как работает устройство,
и самостоятельно писать драйверы для не поддерживаемых официально ОС.

## Файловая система
Ещё одним важным компонентом ядра является *файловая система*. Устройства по типу
жёстких дисков и SSD абсолютно ничего не знают про файлы и директории.
Всё, что они умеют, - хранить какую-то информацию, а на содержание и структуру этой
информации им наплевать. Понятное дело, что, когда диск использует сразу множество
программ, надо как-то регулировать его использование, чтобы не возникало конфликтов.

Более того, чтобы записать информацию на диск, необходимо отыскать на нём свободное
место. А как вообще понять, какое место свободное, а какое - нет? В случайно выбранную
часть жёсткого диска может быть записана любая фигня. Просто взглянув на неё, невозможно
понять, актуальная эта информация, или же это никому не нужный мусор.
Следовательно, необходимо отслеживать в отдельном месте, какие части диска заняты,
а какие - нет.

Файловая система нужна как раз для того, чтобы решать такие проблемы. Она организует
и структурирует все данные, сохраняемые на диск: позволяет разбивать информацию на
отдельные, самостоятельные единицы, которые называют *файлами*, даёт возможность организовывать
их расположение с помощью директорий. Благодаря файловой системе программам вообще
не надо беспокоиться о том, в какую часть диска будут записаны их данные, необходимо знать
лишь название файла и путь до него. А о расположении содержимого на диске
беспокоится файловая система. Она же ищет свободное место при создании новых файлов
и выдаёт ошибки, когда места недостаточно.

## Исполняемые файлы
Замечательная черта файлов в том, что внутри них можно хранить не только данные, с которыми
работают программы. В них можно хранить и сами программы. Файл, содержащий программу, называют
*исполняемым*, потому что программу внутри него можно исполнить. Исполняемый файл хранит
не только процессорные инструкции, но ещё и дополнительную информацию для операционной системы,
содержание и формат которой определяются самой ОС. 

Исполняемые файлы надо каким-то образом отличать от обычных. В Windows это делается
топорным, но понятным путём: файлы, названия которых заканчиваются на `.exe`, считаются исполняемыми.
В операционных системах, корни которых уходят к UNIX, то есть Linux и MacOS, сама файловая
система запоминает, какие файлы исполняемые, а какие - нет. Там, чтобы сделать файл
исполняемым, не надо менять его название, надо просто поставить на нём специальную метку.
Важное замечание: метка никак не влияет на содержимое файла. Это мета-информация,
такая же, как, например, название файла. Мета-информацию файловая система хранит в
специально отведённом месте, которое совсем не обязательно должно находиться рядом с
содержимым файла.

## Процессы
Процессор никогда не исполняет программы прямо с диска. Перед началом выполнения операционная
система целиком копирует программу в оперативную память и настраивает её окружение. Программа,
которая выполняется конкретно в данный момент, а не просто лежит на диске, называется *процессом*. 
Один и тот же исполняемый файл можно запустить много раз. Сделав это, вы получите идентичные,
но не зависимые друг от друга процессы.

Все процессы, рожденные из одного исполняемого файла, являются копиями друг друга,
поэтому логика в них абсолютно одна и та же. Однако они совсем не обязательно будут заниматься одними и теми же вещами,
дублируя работу друг друга. Как правило, процесс не выполняется сам по себе, он получает на вход какие-то
данные от пользователя или другого процесса. Входные данные могут быть разными, а результат выполнения
процесса напрямую зависит от них.

Например, ты два раза запускаешь одну и ту же программу, копирующую файлы, но в первый раз
говоришь ей скопировать файл `cat_video.mp4`, а во второй раз - файл `homework.zip`.
Очевидно, что в разных случаях результат выполнения процесса будет разным, несмотря на то,
что оба процесса созданы из одной и той же программы и, по сути, полностью идентичны.

## Как процессы общаются друг с другом и с ОС?
Любые обращения к операционной системе, будь то создание файла, взаимодействие с железом или запуск
исполняемого файла, делаются через системные вызовы. Системные вызовы происходят следующим образом:
программа записывает в регистры процессора определённые данные, говорящие операционной системе, что
конкретно от неё требуется, а потом передаёт управление ядру ОС. В процессорах семейства x86 даже
есть специальная инструкция, передающая управление ядру, то есть совершающая системный
вызов. В языка ассемблера она обозначается как `syscall`

Рассмотрим конкретный пример, написанный под ядро Linux: системный вызов, прекращающий работу процесса.
На языке ассемблера этот вызов можно описать следующим образом:

```asm
mov rax,60
xor rdi,rdi
syscall
```

В регистр `rax` помещается *код системного вызова*, в данном случае `60`. Именно этот код определяет,
что от операционной системы требуется. Все остальные регистры нужны для того, чтобы передавать данные.
В этом вызове используется регистр `rdi`, в нём передаётся *код возврата* процесса. Инструкция `xor rdi,rdi`
обнуляет значение регистра `rdi`, поэтому код возврата будет равен нулю.
Нулевой код возврата означает, что процесс завершился без ошибок. Соответственно, ненулевой код означает,
что что-то пошло не так.

Между собой процессы могут общаться множеством самых различных способов, код возврата - один из них.
Ещё процессы могут посылать друг другу сообщения и запускать другие исполняемые файлы, создавая новые
процессы. При запуске исполняемого файла программе можно передать *аргументы* - по сути, входные
данные, говорящие, что конкретно программе надо делать.

Например, если вы напишете `ping 8.8.8.8` в командной строке Windows, то она
найдёт в системных директориях исполняемый файл с названием `ping.exe`
и запустит, передав ему аргумент `8.8.8.8`. Запуск исполняемых файлов и передача им аргументов
тоже происходят через системные вызовы. Правда важно заметить, что некоторые команды встроены
прямо в командную строку, поэтому для них никакие исполняемые файлы искать не надо. К ним относятся
такие команды, как `dir`, `echo`, `cls` и ещё множество всего. В Linux и MacOS всё немного попроще,
там встроенных команд очень мало, поэтому практически каждая команда - это отдельная программа,
которую вообще не обязательно использовать из командной строки.

(Оговорка: по факту в Linux нет никакой командной строки, есть терминал и командная оболочка, но сейчас
мы в это углубляться не будем, т.к. подразумеваем, что читатели по большей части
сидят на Windows)

<img 
    class="universal"
    src="/artwork/cs-101/linux.jpg"
    alt='Рано или поздно Linux вас всё равно догонит'
/>
