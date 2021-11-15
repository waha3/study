package intset

import (
	"bytes"
	"fmt"
)

type Inset struct {
	words []uint64
}

func (s *Inset) Has(x int) bool {
	word, bit := x/64, uint(x%64)
	return word < len(s.words) && s.words[word]&(1<<bit) != 0
}

func (s *Inset) Add(x int) {
	word, bit := x/64, uint(x%64)

	for word >= len(s.words) {
		s.words = append(s.words, 0)
	}

	s.words[word] |= 1 << bit
}

func (s *Inset) UnionWith(t *Inset) {
	for i, tword := range t.words {
		if i < len(s.words) {
			s.words[i] |= tword
		} else {
			s.words = append(s.words, tword)
		}
	}
}

func (s *Inset) String() string {
	var buf bytes.Buffer
	buf.WriteByte('{')
	for i, word := range s.words {
		if word == 0 {
			continue
		}

		for j := 0; j < 64; j++ {
			if word&(1<<uint(j)) != 0 {
				if buf.Len() > len("{") {
					buf.WriteByte(' ')
				}
			}
			fmt.Fprintf(&buf, "%d", 64*i+j)
		}
	}
	buf.WriteByte('}')
	return buf.String()
}
