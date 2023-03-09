<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:param name="code"/>
    <xsl:param name="title"/>
    <xsl:decimal-format name="d" decimal-separator="," grouping-separator="."/>
    <xsl:template match="/">
        <xsl:for-each select="estados/estado[@id = $code]">
            <table>
                <caption>
                    <xsl:value-of select="$title"/>
                </caption>
                <tr>
                    <th>População</th>
                    <td>
                        <xsl:value-of select="format-number(populacao,'###.###','d')"/>
                    </td>
                </tr>
                <tr>
                    <th>Capital</th>
                    <td>
                        <xsl:value-of select="capital"/>
                    </td>
                </tr>
                <tr>
                    <th>PIB</th>
                    <td>R$ 
                        <xsl:value-of select="format-number(pib,'###.###,00','d')"/>
                    </td>
                </tr>
            </table>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>
