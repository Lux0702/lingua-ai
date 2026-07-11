# Lesson Schema

Root Object

lesson

--------------------------------

lesson.id

Type:
string

Description:
Unique lesson identifier.

--------------------------------

lesson.title

Type:
string

Description:
Lesson title.

--------------------------------

lesson.language

Type:
string

Example:

zh

en

ja

ko

--------------------------------

lesson.course

Type:
string

--------------------------------

lesson.module

Type:
string

--------------------------------

lesson.content

Type:
object

Contains all lesson sections.

lesson.content.overview

Type:
string

Required:
true

--------------------------------

lesson.content.objectives

Type:
array<string>

Required:
true

--------------------------------

lesson.content.vocabulary

Type:
array<Vocabulary>

Required:
true

--------------------------------

lesson.content.grammar

Type:
array<Grammar>

--------------------------------

lesson.content.dialogue

Type:
Dialogue

--------------------------------

lesson.content.reading

Type:
Reading

--------------------------------

lesson.content.exercises

Type:
array<Exercise>
